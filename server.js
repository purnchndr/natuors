require('dotenv').config({ path: './config.env' });
const app = require('./app');

// console.log(process.env);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(
    `App is running on port ${PORT}, in ${process.env.NODE_ENV} environment`
  )
);
