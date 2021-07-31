const express = require('express');

const app = express();

// global middleware
// app.use(middleware);

function middleware1(req, res, next) {
  req.customProperty = 100;
  next();
}

function middleware2(req, res, next) {
  console.log(`custom property: ${req.customProperty}`);
  req.customProperty = 400;
  next();
}

function errorHandler(err, req, res, next) {
  if (err) {
    res.json({ err: err.message });
  }
}

app.use(middleware1);
app.use(middleware2);

// req: request object
// middleware between '/' and func: route specific middleware
app.get('/', (req, res, next) => {
  res.send(`<h1>Final value is ${req.customProperty}</h1>`);
});

// If error occurs in some middleware then express jumps to errorHandler. Therefore errorHandler at the end of the code
app.use(errorHandler);

app.listen(3000, console.log(`Server running on port 3000`));
