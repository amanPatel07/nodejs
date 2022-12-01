const Car = require('./../model/carModel');
const APIFeature = require('./../utils/apiFeatures');
const asyncCatch = require('./../utils/asyncErrorHandler');
const ErrorHandler = require('./../utils/ErrorHandler');

exports.getAllCar = asyncCatch(async (req, res, next) => {
    const feature = new APIFeature(Car.find(), req.query)
        .filter()
        .sort()
        .paginate()
    const cars = await feature.query
    res.status(200)
        .json({
            status: 200,
            // results: cars.length,
            response: {
                cars
            }
        })
})

exports.getCar = asyncCatch(async (req, res, next) => {
    const car = await Car.findById(req.params.id).populate('reviews');
    if (!car) {
        return next(new ErrorHandler(`Cannot find the id`, 404))
    }
    res.status(200)
        .json({
            status: 200,
            response: {
                car
            }
        });
})

exports.postCar = asyncCatch(async (req, res, next) => {
    const car = await Car.create(req.body);
    if (!car) {
        return next(new ErrorHandler(`Cannot find the id`, 404))
    }
    res.status(200)
        .json({
            status: 200,
            response: {
                car
            }
        });
})

exports.deleteCar = asyncCatch(async (req, res, next) => {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
        return next(new ErrorHandler(`Cannot find the id`, 404))
    }
    res.status(200)
        .json({
            status: "Deleted",
            car
        })

})

exports.updateCar = asyncCatch(async (req, res, next) => {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!car) {
        return next(new ErrorHandler(`Cannot find the id`, 404))
    }
    res.status(200)
        .json({
            status: 200,
            response: {
                car
            }
        })
})

exports.carStats = asyncCatch(async (req, res, next) => {
    const stats = await Car.aggregate([
        {
            $unwind: '$color'
        },
        {
            $match: { color: { $eq: 'white' } }
        },
        {
            $group: {
                _id: { name: "$name" }
            }
        }
    ]);
    console.log(stats)
    res.status(200)
        .json({
            stats
        })
})

exports.carModels = asyncCatch(async (req, res, next) => {
    const models = await Car.aggregate([
        {
            $unwind: '$color'
        }
    ])
    res.status(200)
        .json({
            // results: models.length,
            models
        })
})