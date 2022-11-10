const express = require('express');
const carRoute = require('./routes/carRoutes');
const ErrorHandler = require('./utils/ErrorHandler');
const globalErrorHandler = require('./controller/globalErrorHandler');

const app = express();
app.use(express.json());

app.use('/api/car', carRoute);

/**
 * Middleware function for the Error handling
 */
app.all('*', (req, res, next) => {
    console.log("new error",new ErrorHandler(`Cannot get ${req.originalUrl}`))
    next(new ErrorHandler(`Cannot get ${req.originalUrl}`, 404))
})
app.use(globalErrorHandler)

module.exports = app;