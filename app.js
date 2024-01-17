const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Hello from server!' });
});

app.listen(PORT, () => console.log('App is running'));
