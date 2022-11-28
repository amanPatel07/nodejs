const User = require('./../model/userModel');
const asyncCatch = require('./../utils/asyncErrorHandler');
const ErrorHandler = require('./../utils/ErrorHandler');

exports.signup = asyncCatch(async (req, res, next) => {
    // const newUser = await User.create(req.body);
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });
    if(!newUser) {
        return next(new ErrorHandler('Something went wrong!', 404))
    }
    res.status(201)
        .json({
            status: 201,
            response: {
                newUser
            }
        })
})