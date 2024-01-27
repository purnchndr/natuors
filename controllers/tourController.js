const Tour = require('../models/tourModel');

const getAllTours = async (req, res, next) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.errmsg,
    });
  }
};

const getTour = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id && (id.length != 12 || id.length != 24)) return invalidID();
    const tour = await Tour.findById(id);

    res.status(200).json({
      status: 'success',
      result: 1,
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.errmsg,
    });
  }
  function invalidID() {
    return res.status(404).json({
      status: 'fail',
      message: 'id not found / invalid id',
    });
  }
};

const createTour = async (req, res, next) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      result: 1,
      data: { tours: newTour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.errmsg,
    });
  }
};

const updateTour = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'success', tour: { tour } });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err?.errmsg });
  }
};

const deleteTour = async (req, res, next) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndDelete(id);
    console.log(tour);
    res.status(204).json({
      message: 'success',
      data: null,
    });
  } catch (err) {
    return res.status(404).json({ status: 'fail', message: err });
  }
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
