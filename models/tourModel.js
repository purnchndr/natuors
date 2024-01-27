const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    requaired: [true, 'A tour must have a name'],
  },
  rating: {
    type: Number,
    requaired: true,
    default: 4.5,
  },
  price: {
    type: Number,
    requaired: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
