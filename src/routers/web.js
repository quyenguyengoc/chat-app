import express from 'express';

import { controller } from './../controllers/index';
import { validation } from './../validation/index';
import { localAuth } from './../controllers/passport/local';

localAuth();

let router = express.Router();

/**
 * init routes
 */
let routes = (app) => {
  router.get('/', controller.home.getHome);
  
  router.get('/login', controller.session.login);
  
  router.post('/login', validation.authen.authenValidation, controller.session.authen);
  
  router.get('/users/register', controller.user.newUser);

  router.post('/users/register', validation.user.userValidation, controller.user.insert);

  router.get('/users/active/:token', controller.user.active);

  return app.use('/', router);
}

module.exports = routes;
