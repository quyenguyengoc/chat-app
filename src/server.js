import express from 'express';
let app = express();

let hostname = 'localhost';
let port = 3333;

app.get("/helloworld", (req, res) => {
  res.send("<h1>Hello World!!!<h1>")
});

app.listen(port, hostname, () => {
  console.log('Hello world!!!');
})