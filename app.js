const express = require('express');
const morgan = require('morgan');

const fs = require('fs');

const tourRouter = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoute');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRoute);

const PORT = 3000;

app.use((req, res, next) => {
  req.time = Date.now();
  console.log(req.time);
  next();
});

app.listen(PORT, () => console.log('App is running on port', PORT));
