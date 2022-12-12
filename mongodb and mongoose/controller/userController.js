const multer = require('multer');

const Sale = require('./../model/saleModel');
const User = require('./../model/userModel');
const asyncCatch = require('./../utils/asyncErrorHandler');
const factory = require('./handlerFactory');
const ErrorHandler = require('./../utils/ErrorHandler');
const fileController = require('./fileController');
let nameFile = 'image'
exports.uploadFile = fileController.upload.single(nameFile)

const filterObj = (obj, ...allowedField) => {
    let newObject = {};
    Object.keys(obj).forEach(item => {
        if (allowedField.includes(item)) newObject[item] = obj[item];
    });
    return newObject;
}

exports.getAllUser = factory.getAllDoc(User);
exports.getUser = factory.getDoc(User,
    {
        path: 'car_purchase_details',
        select: "-__v -ownedBy",
        populate: {
            path: 'carPurchase',
            model: 'Cars',
            select: 'name'
        }
    },
    '-__v'
);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);

exports.carPurchase = asyncCatch(async (req, res, next) => {
    const newPurchase = await Sale.create(req.body);

    // const user = await User.findByIdAndUpdate(newPurchase.ownedBy, { car_purchase_details: await  })

    const user = await User.findById(newPurchase.ownedBy);
    const updateUser = await user.updateUserPurchaseDetails(newPurchase);
    await User.findByIdAndUpdate(newPurchase.ownedBy, { car_purchase_details: updateUser });

    if (!newPurchase) {
        return next(new ErrorHandler(`Something went wrong`, 404));
    }
    res.status(200)
        .json({
            status: 200,
            newPurchase
        });
});

/**
 * Update the current logged in user
 */
exports.updateCurrentUser = asyncCatch(async (req, res, next) => {
    if (req.body.password || req.body.confirmPassword) {
        return next(new ErrorHandler('To change password, change the route to updatePassword', 400))
    }
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.image = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200)
        .json({
            status: 200,
            data: updatedUser
        });
});

/**
 * Delete the current logged in user
 */
exports.deleteCurrentUser = asyncCatch(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, { active: false });
    res.status(200)
        .json({
            data: null
        });
});

/*
exports.getUser = asyncCatch(async (req, res, next) => {
    const user = await User.findById(req.params.id).populate(
        {
            path: 'car_purchase_details',
            select: "-__v -ownedBy",
            populate: {
                path: 'carPurchase',
                model: 'Cars',
                select: 'name'
            }

        }
    ).select('-__v');
    if (!user) {
        return next(new ErrorHandler(`Cannot find the id`, 404))
    }
    res.status(200)
        .json({
            status: 200,
            response: {
                user
            }
        });
});
*/