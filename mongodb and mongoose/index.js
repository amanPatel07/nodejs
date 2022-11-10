const express = require('express');
const carRoute = require('./routes/carRoutes');
const cors = require('cors')

const app = express();
app.use(express.json());
// app.use(cors(
//     {
//         origin: 'http://localhost:4200'
//     }
// ));
app.use('/api/car', carRoute);
app.all('*', (req, res, next) => {
    res.status(404)
        .json({
            ErrorMesssage: `Cannot get ${req.originalUrl}`
        })
})

module.exports = app;