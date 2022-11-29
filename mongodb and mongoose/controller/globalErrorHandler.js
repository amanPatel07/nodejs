const ErrorHandler = require('./../utils/ErrorHandler');

// CAST ERROR HANDLER
const handleCastError = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new ErrorHandler(message, 400)
}

// DUPLICATE KEY/FIELD MONGODB DRIVER HANDLER
const handleDuplicKeyError = err => {
    const message = `Dulpicate Key ${JSON.stringify(err.keyValue)}`;
    return new ErrorHandler(message, 400);
}

// MONGOOSE SCHEMA VALIDATION ERROR HANDLER
const handleValidationError = err => {
    const message = Object.values(err.errors).map(el => el.message).join(',');
    return new ErrorHandler(message, 400)
}

// Jwt token error handler
const handleJwtTokenError = err => new ErrorHandler('Please try logging again!', 401)

// Jwt token error handler
const handleJwtTokenExpired = err => new ErrorHandler('Token Expired, please try logging again!', 401)

// SEND THE RESPONSE DURING DEVELOPMENT ENVIRONMENT
const sendErrorDev = (err, res) => {
    res.json({
        error: err,
        errorMessage: err.message,
        stack: err.stack
    })
}

// SEND RESPONSE DURING PRODUCTION ENVIRONMENT
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode)
            .json({
                status: err.status,
                errorMessage: err.message
            })
    }
    else {
        console.log(err)
        res.status(500)
            .json({
                status: 'error',
                message: 'Something went wrong!'
            })
    }
}

module.exports = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {

        let error = Object.defineProperties({}, Object.getOwnPropertyDescriptors(err))

        // let error = { ...err }

        if (err.name === 'CastError') error = handleCastError(error)
        if (err.code === 11000) error = handleDuplicKeyError(error)
        if (err.name === 'ValidationError') error = handleValidationError(error)
        if (err.name === 'JsonWebTokenError') error = handleJwtTokenError(error)
        if (err.name === 'TokenExpiredError') error = handleJwtTokenExpired(error)

        sendErrorProd(error, res)
    }
}