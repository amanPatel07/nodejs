const Car = require('./../model/carModel');
const asyncCatch = require('./../utils/asyncErrorHandler');
const factory = require('./handlerFactory');

exports.getAllCar = factory.getAllDoc(Car);
exports.getCar = factory.getDoc(Car, {
    path: 'reviews',
    select: 'review rating user'
});
exports.deleteCar = factory.deleteOne(Car);
exports.postCar = factory.createDoc(Car);
exports.updateCar = factory.updateOne(Car);

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
});