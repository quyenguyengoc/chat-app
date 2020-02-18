import express from 'express';

import { home, session } from './../controllers/index';

let router = express.Router();

/**
 * init routes
 */
let routes = (app) => {
  router.get('/', home.getHome);
  
  router.get('/login', session.login);

  return app.use('/', router);
}

module.exports = routes;
