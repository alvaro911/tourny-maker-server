import passport from 'passport';
import LocalStrategy from 'passport-local';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
} from 'passport-jwt';

import User from '../modules/user/user.model';
import constants from '../config/constants';

const localOptions = {
  usernameField: 'email',
};

const localStg = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      } else if (!user.authUser(password)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  },
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(
    'Authorization',
  ),
  secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(
  jwtOptions,
  async (payload, done) => {
    try {
      const user = await User.findById(payload._id);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  },
);

// const creatorStrategy = new JWTStrategy(
//   jwtOptions,
//   async (payload, done) => {
//     try {
//       const user = await User.findById(payload._id);
//
//       if (!user || user.role !== 'CREATOR') {
//         return done(null, false);
//       }
//
//       return done(null, user);
//     } catch (e) {
//       return done(e, false);
//     }
//   },
// );

passport.use(localStg);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', {
  session: false,
});
export const authJwt = passport.authenticate('jwt', {
  session: false,
});
// export const creatorJwt = passport.authenticate('jwt', {
//   session: false,
// });

export function creatorIsRequired(req, res, next) {
  if (!req.user || req.user.role !== 'CREATOR') {
    throw new Error('Unauthorized');
  }

  return next();
}
