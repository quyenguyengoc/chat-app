import express from 'express';

import connectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';

let app = express();

connectDB();

configViewEngine(app);

app.get("/", (req, res) => {
  return res.render('main/home');
});

app.get("/login", (req, res) => {
  return res.render('session/login');
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log('Hello world!!!');
});
