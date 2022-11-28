const jwt = require('jsonwebtoken')
const User = require('./../model/userModel');
const asyncCatch = require('./../utils/asyncErrorHandler');
const ErrorHandler = require('./../utils/ErrorHandler');

exports.signup = asyncCatch(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });
    if(!newUser) {
        return next(new ErrorHandler('Something went wrong!', 404))
    }

    const access_Token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN, {
         expiresIn: process.env.JWT_ExpiresIn
    })

    res.status(201)
        .json({
            status: 201,
            response: {
                newUser,
                access_Token
            }
        })
});

exports.login = asyncCatch(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorHandler('Please enter correct email for password', 400))
    }

    const token = '';
    res.status(200).json({
        status: "success",
        token
    })
})