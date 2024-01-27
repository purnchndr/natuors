require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');

const app = require('./app');

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
mongoose
  .connect(process.env.MONGODBURI, mongooseOptions)
  .then((con) => console.log('DB Connected'))
  .catch((e) => console.log(e, 'DB Connection failed'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(
    `App is running on port ${PORT}, in ${process.env.NODE_ENV} environment`
  )
);
