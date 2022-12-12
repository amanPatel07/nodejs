const express = require('express');

const authController = require('./../controller/authController');
const carController = require('./../controller/carController');
const reviewRouter = require('./../routes/reviewRoute');
const fileController = require('./../controller/fileController');

const router = express.Router();

router.use('/:carId/review', reviewRouter);

router
    .route('/carStats')
    .get(carController.carStats);

router
    .route('/carModel')
    .get(carController.carModels);

router
    .route('/')
    .get(carController.getAllCar)
    .post(carController.postCar);

router
    .route('/:id')
    .get(carController.getCar)
    .patch(carController.updateCar)
    .delete(carController.deleteCar);
    // .delete(authController.authUser, authController.restrictTo('admin'), carController.deleteCar)

module.exports = router;