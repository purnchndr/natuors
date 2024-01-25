const express = require('express');
const morgan = require('morgan');

const fs = require('fs');

const tourRouter = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoute');

const app = express();

app.use(express.json());

process.env.NODE_ENV === 'development' && app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.time = Date.now();
  console.log(req.ip);
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRoute);

module.exports = app;
