const { json } = require('express');
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const PORT = 3000;

const tours = require('./dev-data/data/tours-simple.json');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

app.get('/api/v1/tours', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: { tours: tours },
  });
});

app.post('/api/v1/tours', (req, res, next) => {
  console.log(req.body);
  res.send('');
});

app.listen(PORT, () => console.log('App is running'));
