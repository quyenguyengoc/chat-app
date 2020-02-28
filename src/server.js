import express from 'express';
import bodyParser from 'body-parser';
import connectFlash from 'connect-flash';
import passport from 'passport';

import connectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import webRoutes from './routers/web';
import configSession from './config/session';

global._ = require('lodash');
global.logger = require('logger').createLogger('logs/development.log');

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

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  logger.info('Hello world!!!');
});
