/* eslint-disable padded-blocks */

import passport from 'passport';
import LocalStrategy from 'passport-local';

import User from '../user/user.model';

const localOpts = {
  userNameField: 'email',
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false);
    } else if (user.password !== password) {
      return done(null, false);
    }

    return done(null, user);

  } catch (e) {
    return done(e, false);
  }
});

passport.use(localStrategy);
