const Tour = require('../models/tourModel');

const getAllTours = async (req, res, next) => {
  try {
    const query = { ...req.query };

    // return res.status(200).json({
    //   status: 'success',
    //   result: await Tour.find(query)
    //     .select(['name', 'price'])
    //     .sort('name')
    //     .skip(2)
    //     .limit(3),
    // });

    const excludes = ['page', 'sort', 'limit', 'fields'];
    excludes.forEach(item => delete query[item]);
    // Quering data
    let tours = Tour.find(query);

    //Sorting data
    const sortBy = req.query.sort;
    if (sortBy) tours.sort(sortBy.replaceAll(',', ' '));
    else tours.sort('name');

    //limiting fields
    const fields = (req.query.fields || '-__v').replaceAll(',', ' ');
    tours.select(fields);
    //limiting results rows
    const page = (req.query.page || 1) - 1;
    const limit = req.query.limit || 5;
    tours.skip(page * limit).limit(limit);
    const rowslength = await Tour.countDocuments();
    console.log(rowslength);
    if (rowslength <= page * limit) throw new Error('Page does not exist');

    //executing query
    const data = await tours;
    res.status(200).json({
      status: 'success',
      result: data.length || 0,
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
      additional: "Sorry your request can't be fullfill at this time",
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
    return next(err);
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
    // const newTour = new Tour(req.body);
    //await newTour.save();
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

const top5Cheap = async (req, res, next) => {
  try {
    req.query.limit = '5';
    req.query.sort = '-ratingAvarage,price';
    req.query.fields = 'name,price,summary,difficulty,ratingAvarage';
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  top5Cheap,
};
