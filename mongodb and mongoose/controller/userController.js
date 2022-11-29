const User = require('./../model/userModel');
const asyncCatch = require('./../utils/asyncErrorHandler');

/**
 * Get the all user email, id, name etc
 */
exports.getUser = asyncCatch(async (req, res, next) => {
    const users = await User.find();
    res.status(200)
        .json({
            status: 200,
            users
        })
})