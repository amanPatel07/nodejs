const Car = require('./../model/carModel');
const APIFeature = require('./../utils/apiFeatures');

exports.getAllCar = async (req, res) => {
    try {
        const feature = new APIFeature(Car.find(), req.query)
            .filter()
            .sort()
            .paginate()
        const cars = await feature.query
        res.status(200)
            .json({
                status: 200,
                response: {
                    cars
                }
            });
    } catch (error) {
        console.log(error)
    }
}

exports.getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        res.status(200)
            .json({
                status: 200,
                response: {
                    car
                }
            });
    } catch (error) {
        res.status(400)
            .json({
                error
            })
    }
}

exports.postCar = async (req, res) => {
    try {
        const newCar = await Car.create(req.body);
        res.status(200)
            .json({
                status: 200,
                response: {
                    newCar
                }
            });
    }
    catch (error) {
        res.status(400)
            .json({
                error
            })
    }
}

exports.deleteCar = async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        res.status(200)
            .json({
                status: "Deleted",
                deletedCar
            })
    } catch (error) {
        res.status(400)
            .json({
                error
            })
    }
}

exports.updateCar = async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200)
            .json({
                response: updatedCar
            })
    } catch (error) {
        res.status(404)
            .json({
                response: error
            })
    }
}

exports.carStats = async (req, res) => {
    try {
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
    } catch (error) {
        res.json({
            status: 404,
            message: error
        })
    }
}

exports.carModels = async (req, res) => {
    try {
        const models = await Car.aggregate([
            {
                $unwind: '$color'
            }
        ])
        res.status(200)
            .json({
                models
            })
    } catch (error) {
        res.json({
            status: 'fail',
            message: error
        })
    }
}