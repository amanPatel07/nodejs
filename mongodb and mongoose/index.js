const express = require('express');

const carRoute = require('./routes/carRoutes');
const userRoute = require('./routes/userRoutes');
const reviewRoute = require('./routes/reviewRoute');

const ErrorHandler = require('./utils/ErrorHandler');
const globalErrorHandler = require('./controller/globalErrorHandler');

const app = express();
app.use(express.json());

app.use('/api/car', carRoute);
app.use('/api/user', userRoute);
app.use('/api/review', reviewRoute);

/**
 * Middleware function for the Error handling
 */
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Cannot get ${req.originalUrl}`, 404))
})
app.use(globalErrorHandler)

module.exports = app;