require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
const tours = require('./tours-simple.json');

mongoose
  .connect(process.env.MONGODBURI)
  .then(con => console.log('DB Connected'))
  .catch(e => console.log(e, 'DB Connection failed'));

// Tour.create(tours);
async function deleteAll() {
  try {
    await Tour.deleteMany({});
    console.log('deleted');
    await mongoose.disconnect();
  } catch (e) {
    console.log(e);
  }
}

async function addAll() {
  try {
    const res = await Tour.create(tours);
    console.log(res);
    await mongoose.disconnect();
  } catch (e) {
    console.log(e);
  }
}

if (process.argv[2] === '--import') addAll();
else if (process.argv[2] === '--delete') deleteAll();

// deleteAll();
// addAll();
