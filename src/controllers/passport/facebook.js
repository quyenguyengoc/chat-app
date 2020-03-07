import passport from 'passport';
import passportFacebook from 'passport-facebook';
require('dotenv').config()

import userModel from './../../models/userModel';
import { transMessages } from './../../../locales/en';

let facebookStrategy = passportFacebook.Strategy;
const ENV = process.env;
const CALLBACK_URL = `https://${ENV.APP_HOST}:${ENV.APP_PORT}/auth/facebook/callback`; 

let facebookAuth = () => {
  passport.use(new facebookStrategy({
    clientID: ENV.FB_APP_ID,
    clientSecret: ENV.FB_APP_SECRET,
    callbackURL: CALLBACK_URL,
    passReqToCallback: true,
    profileFields: ['email', 'displayName']
  }, async (req, accessToken, refreshToken, profile, done) => {
    let condition = { 'facebook.uid': profile.id };
    let user = null;
    let result = {
      flag: true,
      detail: {},
      type: 'success',
      kind: 'flash'
    };
    try {
      user = await userModel.find(condition);
      if (_.isNull(user)) {
        let userInfo = {
          fullname: profile.displayName,
          facebook: {
            uid: profile.id,
            token: accessToken,
            email: _.first(profile.emails).value
          }
        }
        user = await userModel.insert(userInfo);
      }
      result.message = transMessages.login.success(user.fullname);
    } catch(error) {
      result = {
        flag: false,
        message: transMessages.login.failure.serverError,
        detail: {},
        type: 'danger',
        kind: 'alert'
      };
    }
    
    return done(null, user, req.flash('result', result));
  }))
}

module.exports = {
  facebookAuth: facebookAuth
};
