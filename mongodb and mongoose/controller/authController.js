const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('./../model/userModel');
const asyncCatch = require('./../utils/asyncErrorHandler');
const ErrorHandler = require('./../utils/ErrorHandler');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_TOKEN, {
        expiresIn: process.env.JWT_ExpiresIn
    })
}

/**
 * Sign up for the new Uer
 */
exports.signup = asyncCatch(async (req, res, next) => {
    // const newUser = await User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     confirmPassword: req.body.confirmPassword,
    //     passwordChangedAt: req.body.passwordChangedAt,
    //     role: req.body.role
    // });
    const newUser = await User.create(req.body)
    if (!newUser) {
        return next(new ErrorHandler('Something went wrong!', 404))
    }

    const access_Token = signToken(newUser._id)

    res.status(201)
        .json({
            status: 201,
            response: {
                newUser,
                access_Token
            }
        })
});

/**
 * Login for the user with access token
 */
exports.login = asyncCatch(async (req, res, next) => {
    const { email, password } = req.body;

    /**
     * Check if the email and password is available in the request body
     */
    if (!email || !password) {
        return next(new ErrorHandler('Please enter correct email for password', 400))
    }
    /**
     * Check whether the user exists with the requested email
     */
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(new ErrorHandler('Incorrect email', 401))
    }
    /**
     * Check whether the user is logining with the correct password
     */
    const authUser = await user.checkPassword(password, user.password)
    if (!authUser) {
        return next(new ErrorHandler('Incorrect password', 401))
    }

    const access_Token = signToken(user._id)
    res.status(200).json({
        status: "success",
        access_Token
    })
})

/**
 * Middleware to protect the route from the unauthorized user login or accessing route without logged in
 */
exports.authUser = asyncCatch(async (req, res, next) => {
    let access_Token;

    /**
     * Check and get the token from the request header
     */
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        access_Token = req.headers.authorization.split(' ')[1]
    }
    if (!access_Token) {
        return next(new ErrorHandler('You need to login to access!', 401))
    }

    /**
     * Verify the access token is of valid user 
     */
    const decodedToken = await promisify(jwt.verify)(access_Token, process.env.JWT_TOKEN)

    /**
     * Check if the current user still exists
     */
    const currentUser = await User.findById(decodedToken.id)
    if (!currentUser) {
        return next(new ErrorHandler('The user belonging to this username does not exists', 401));
    }

    /**
     * Check if the password is changedd after the token is generated
     */
    if(currentUser.isPasswordChangedAfter(decodedToken.iat)) {
        return next(new ErrorHandler('The user password is changed recently, try logging again', 401));
    }

    req.user = currentUser
    next();
})

/**
 * Certain Actions allowed to be performed by the Admin only.
 */
exports.restrictTo = (...role) => {
    return (req, res, next) => {
        if(!role.includes(req.user.role)){
            return next(new ErrorHandler('You are not authorized to perform the action', 403))
        }
        next();
    }
}