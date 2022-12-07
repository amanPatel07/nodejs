const multer = require('multer');

const Car = require('./../model/carModel');
const asyncCatch = require('./../utils/asyncErrorHandler');
const ErrorHandler = require('./../utils/ErrorHandler');
const factory = require('./handlerFactory');

/**
 * Folder path and file name of the uploaded file for saving the file. 
 */
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './../dev-data/carImage');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `car-${req.car.id}-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new ErrorHandler('Not a image! Upload only image', 400), false)
    }
}

const upload = multer({
    multerStorage,
    multerFilter
})

exports.uploadCarImage = upload.single('image');

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

/*
exports.getCar = asyncCatch(async (req, res, next) => {
    const car = await Car.findById(req.params.id).populate({
        path: 'reviews',
        select: 'review rating user'
    });
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
*/