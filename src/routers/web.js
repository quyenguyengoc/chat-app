import express from 'express';

import { controller } from './../controllers/index';
import { validation } from './../validation/index';

let router = express.Router();

/**
 * init routes
 */
let routes = (app) => {
  router.get('/', controller.home.getHome);
  
  router.get('/login', controller.session.login);
  
  router.get('/register', controller.user.newUser);

  router.post('/register', validation.user.userValidation, controller.user.insert)

  return app.use('/', router);
}

module.exports = routes;
