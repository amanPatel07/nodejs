const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./index');

mongoose.connect(
    process.env.DATABASE_LOCAL,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
).then(() => {
    console.log('DATABASE CONNECTION SUCCESSFUL!');
}).catch(() => {
    console.log('SOME ERROR OCCURRED!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`);
});