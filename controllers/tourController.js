let tours = require('../dev-data/data/tours-simple.json');

const getAllTours = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: { tours: tours },
  });
};

const getTour = (req, res, next) => {
  const id = +req.params.id || 0;
  const tour = tours.filter((tour) => id === tour.id);
  if (tour.length < 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
  res.status(200).json({
    status: 'success',
    requestTime: req.time,
    completeTime: Date.now(),
    timeTaken: Date.now() - req.time,
    result: 1,
    data: { tour },
  });
};

const createTour = (req, res, next) => {
  const id = tours[tours.length - 1].id + 1;
  const newtour = { ...req.body, id };
  tours.push(newtour);
  res.status(201).json({
    status: 'success',
    result: 1,
    data: { tours: newtour },
  });
};

const updateTour = (req, res, next) => {
  const id = +req.params.id;
  const tourdata = req.body;
  // console.log({ ...tourdata });
  if (!id || !tourdata)
    return res
      .status(404)
      .json({ status: 'fail', message: 'Invalid ID or body' });
  tours = tours.map((tour) => {
    // console.log(tour.id === id);
    return tour.id === id ? { ...tour, ...tourdata } : tour;
  });
  res.status(203).json({ status: 'success', data: { tours } });
};

const deleteTour = (req, res, next) => {
  const id = +req.params.id;
  if (!id)
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  // tours = tours.filter((tour) => tour.id != id);
  res.status(204).json({
    message: 'success',
    data: null,
  });
};

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour };
