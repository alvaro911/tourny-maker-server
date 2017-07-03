import passport from 'passport';
import LocalStrategy from 'passport-local';

import User from '../models/user/user.model';

const localOptions = {
  usernameField: 'email',
};

const localStg = new LocalStrategy(localOptions, async (email, password, done) => {
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
});

passport.use(localStg);

export const authLocal = passport.authenticate('local', { session: false });
