import express from 'express';

import connectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import webRoutes from './routers/web';

let app = express();

connectDB();
configViewEngine(app);
webRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log('Hello world!!!');
});
