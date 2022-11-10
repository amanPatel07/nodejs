const ErrorHandler = require('./../utils/ErrorHandler');

const handleCastError = err => {
    const message = `Invalid ${err.path}: ${path.value}`;
    return new ErrorHandler(message, 404)
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode)
        .json({
            status: err.status,
            error: err,
            errorMessage: err.message,
            stack: err.stack
        })
}

const sendErrorProd = (err, res) => {
    console.log(err.isOperational)
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
    console.log(err)
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err }
        if (error.name === "CastError") {
            error = handleCastError(err)
        }
        sendErrorProd(error, res)
    }
}