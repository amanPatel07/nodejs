// const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// mongoose.connect(
//     process.env.DATABASE_LOCAL,
//     {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     }
// )
//     .then(() => console.log("DATABASE CONNECTION SUCCESSFUL!"))
//     .catch(() => console.log("SOME ERROR OCCURED!"))

// const carSchema = new mongoose.Schema(
//     {
//         company: {
//             type: String,
//             required: [true, "The project name is required!"],
//             unique: true
//         },
//         car: {
//             type: String,
//             required: [true, "The project lead name is required!"]
//         },
//         price: {
//             type: Number,
//             default: 00
//         }
//     }
// );

// const Car = mongoose.model('Car', carSchema)

// const testCar = new Car(
//     {
//         company: "Tesla",
//         car: "Model Y"
//     }
// )

// testCar.save()
//     .then(doc => console.log(doc))
//     .catch(err => console.log(err))

const app = require('./index');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});