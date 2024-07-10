require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODBURI)
  .then(con => console.log('DB Connected'))
  .catch(e => console.log(e.message, 'DB Connection failed'));

app.listen(PORT, () =>
  console.log(
    `App is running on port ${PORT}, in ${process.env.NODE_ENV} environment`
  )
);

// async function start() {
//   try {
//     await mongoose.connect(process.env.MONGODBURI);
//     console.log('DB connected');
//     app.listen(PORT, () =>
//       console.log(
//         `App is running on port ${PORT}, in ${process.env.NODE_ENV} environment`
//       )
//     );
//   } catch (e) {
//     console.log('Error', e.message);
//   }
// }
// start();
