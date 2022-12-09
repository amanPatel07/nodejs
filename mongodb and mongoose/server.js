const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log(`uncaughtException, Shutitng Down!\n${err.name} ${err.message}`);
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./index');

mongoose.connect(
    process.env.DATABASE_LOCAL,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('DATABASE CONNECTION SUCCESSFUL!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`);
});

process.on('unhandledRejection', err => {
    console.log(`unhandledRejection, Shutitng Down!\n${err.name} ${err.message}`)
    server.close(() => {
        process.exit(1);
    });
});
