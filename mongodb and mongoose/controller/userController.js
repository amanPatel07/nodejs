const Sale = require('./../model/saleModel');
const User = require('./../model/userModel');
const asyncCatch = require('./../utils/asyncErrorHandler');

/**
 * Get the all user email, id, name etc
 */
exports.getAllUser = asyncCatch(async (req, res, next) => {
    const users = await User.find();
    res.status(200)
        .json({
            status: 200,
            users
        })
})

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
