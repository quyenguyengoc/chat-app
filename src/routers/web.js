import express from 'express';
import passport from 'passport';

import { controller } from './../controllers/index';
import { validation } from './../validation/index';
import { localAuth } from './../controllers/passport/local';
import { facebookAuth } from './../controllers/passport/facebook';
import { loggedIn, notLoggedIn } from './../services/authService';

localAuth();
facebookAuth();

let router = express.Router();

/**
 * init routes
 */
let routes = (app) => {
  router.get('/', notLoggedIn, controller.home.getHome);
  
  router.get('/login', loggedIn, controller.session.login);
  
  router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

  router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  }))
  
  router.post('/login', loggedIn, validation.authen.authenValidation, controller.session.authen);

  router.get('/logout', notLoggedIn, controller.session.logout);
  
  router.get('/users/register', loggedIn, controller.user.newUser);

  router.post('/users/register', loggedIn, validation.user.userValidation, controller.user.insert);

  router.get('/users/active/:token', loggedIn, controller.user.active);

  return app.use('/', router);
}

module.exports = routes;
