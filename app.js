const express = require('express');
const morgan = require('morgan');

const fs = require('fs');

const tourRouter = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoute');

const app = express();

app.use(express.json());

process.env.NODE_ENV === 'development' && app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRoute);

app.all('*', (req, res, next) => {
  const err = new Error(`Can't found ${req.url} path on this server`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || 'Something went wrong',
    status: err.status || 'failed',
    statuscode: err.statusCode || 500,
  });
});

module.exports = app;
