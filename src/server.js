import express from 'express';

import connectDB from './config/connectDB';

let app = express();
connectDB();

app.get("/helloworld", (req, res) => {
  res.send(`<h1>Hello world!!!</h1>`)
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log('Hello world!!!');
});
