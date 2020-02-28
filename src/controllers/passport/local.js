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
        detail: {}
      };
      let user = null;
      try {
        user = await userService.authen(loginid, pwd);
        result.message = transMessages.login.success(user.fullname);
      } catch(error) {
        result.flag = false;
        result.message = error;
      }
      return done(null, user, req.flash('result', result));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    let condition = { '_id': id };
    userModel.find(condition)
      .then(user => {
        return done(null, user);
      })
      .catch(error => {
        return done(null, null);
      })
  });
};

module.exports = {
  localAuth: localAuth
};
