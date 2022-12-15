const express = require('express');
const path = require('path');

const carRoute = require('./routes/carRoutes');
const userRoute = require('./routes/userRoutes');
const reviewRoute = require('./routes/reviewRoute');

const ErrorHandler = require('./utils/ErrorHandler');
const globalErrorHandler = require('./controller/globalErrorHandler');

const app = express();

/**
 * Rendering the HTML templates
 */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).render('base');
});

app.use('/api/car', carRoute);
app.use('/api/user', userRoute);
app.use('/api/review', reviewRoute);

/**
 * Middleware function for the Error handling
 */
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Cannot get ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);

module.exports = app;