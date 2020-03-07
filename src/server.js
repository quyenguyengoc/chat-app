import express from 'express';
import bodyParser from 'body-parser';
import connectFlash from 'connect-flash';
import passport from 'passport';
import https from 'https';
import pem from 'pem';

import connectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import webRoutes from './routers/web';
import configSession from './config/session';

global._ = require('lodash');
global.logger = require('logger').createLogger('logs/development.log');
 
pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
  if (err) {
    throw err
  }
  let app = express();


  connectDB();
  configSession(app);
  configViewEngine(app);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(connectFlash());
  app.use(express.static('/public'));
  app.use(passport.initialize());
  app.use(passport.session());
  webRoutes(app);
 
  https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    logger.info('Hello world!!!');
  });
})
