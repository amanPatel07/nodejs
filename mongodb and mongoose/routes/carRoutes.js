const express = require('express');
const carController = require('./../controller/carController');
const router = express.Router();

router
    .route('/carStats')
    .get(carController.carStats)

router
    .route('/carModel')
    .get(carController.carModels)

router
    .route('/')
    .get(carController.getAllCar)
    .post(carController.postCar)


router
    .route('/:id')
    .get(carController.getCar)
    .patch(carController.updateCar)
    .delete(carController.deleteCar)


module.exports = router;