import passport from 'passport';
import passportLocal from 'passport-local';

import userModel from './../../models/userModel';
import userService from './../../services/userService';
import { transMessages } from '../../../locales/en';

let localStrategy = passportLocal.Strategy;

let localAuth = () => {
  passport.use(new localStrategy(
    {
      usernameField: 'loginid',
      passwordField: 'pwd',
      passReqToCallback: true
    }, async (req, loginid, pwd, done) => {
      let result = {
        flag: true,
        message: null,
        detail: {},
        type: 'success',
        kind: 'flash'
      };
      let user = null;
      try {
        user = await userService.authen(loginid, pwd);
        result.message = transMessages.login.success(user.fullname);
      } catch(error) {
        result = {
          flag: false,
          message: error,
          detail: {},
          type: 'danger',
          kind: 'alert'
        };
      }
      return done(null, user, req.flash('result', result));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser(async (id, done) => {
    let user = null;
    try {
      let condition = { '_id': id };
      user = await userModel.find(condition);
    } finally {
      return done(null, user);
    }
  });
};

module.exports = {
  localAuth: localAuth
};
