const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    requaired: [true, 'A tour must have a name'],
  },
  duration: { type: Number, required: [true, "Duration can't be empty"] },
  maxGroupSize: Number,
  difficulty: String,
  ratingsAverage: Number,
  ratingsQuantity: Number,
  summary: { type: String, required: true },
  description: String,
  imageCover: { type: String, required: true },
  images: { type: [String], required: true },
  startDates: [Date],
  createdAt: { type: Date, default: Date.now(), select: false },
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
