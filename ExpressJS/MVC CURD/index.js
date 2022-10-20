const express = require('express');
const morgan = require('morgan');

const projectRoute = require('./routes/projectRoutes');
const projectListRoute = require('./routes/projectListRoutes');

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log('Hi, I am first middleware..!!');
    next();
});
app.use((req, res, next) => {
    console.log('Hi, I am second middleware..!!');
    next();
});

app.use('/api/v1/projects', projectRoute);
app.use('/api/v1/projectList', projectListRoute);

module.exports = app;