const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  top5Cheap,
} = require('../controllers/tourController');

const router = express.Router();

router.param('id', (req, res, next) => {
  const id = req.params['id'];
  console.log(id, 'id');
  next();
});

//alliasing
router.route('/top-5-cheap').get(top5Cheap, getAllTours);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
