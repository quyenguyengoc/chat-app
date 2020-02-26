import express from 'express';
import bodyParser from 'body-parser';
import connectFlash from 'connect-flash';

import connectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import webRoutes from './routers/web';
import configSession from './config/session';

global._ = require('lodash');
const path = require('path');

let app = express();

connectDB();
configSession(app);
configViewEngine(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(connectFlash());
app.use(express.static(path.join(__dirname, '/public')));
webRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log('Hello world!!!');
});
