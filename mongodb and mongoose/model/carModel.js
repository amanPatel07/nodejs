const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: [true, "The car name should be unique."],
            maxlength: [25, "The length should not be more than 25."]
        },
        miles_per_gallon: {
            type: Number,
            required: true,
            min: [15, "The minimum gallons should not be less than 15."],
            max: [40, "The minimum gallons should not be more than 40."]
        },
        cylinders: {
            type: Number,
            min: [3, "The minimum cylinders should be not less than 3."],
            max: [12, "The cylinders should not be more than 12."]
        },
        displacement: {
            type: Number,
            min: [100, "The displacement should not be less than 100."],
            max: [500, "The displacement should not be more than 500."]
        },
        horsePower: {
            type: Number
        },
        weight_in_kg: {
            type: Number
        },
        acceleration: {
            type: Number
        },
        year: {
            type: Date
        },
        origin: {
            type: String,
            required: true
        },
        color: {
            type: [String],
            validate: {
                validator: function(item) {
                    return item.length >= 2 
                },
                message: "There should be minimum 2 color be available."
            }
        }
    },
    {
        toJSON: { virtuals: true }
    }
);

// // array validation
// function arrayLimit(item) {
//     return item.length >= 2
// }

// Creating a virtual properties
carSchema.virtual('date').get(function () {
    return this.year.toString()
});

// Creating a document middleware
carSchema.pre('save', function(next) {
    let date = this.year.toString()
    console.log(date)
    let dateS = new Date(date)
    console.log(dateS)
    next();
});
// carSchema.post('save', function(doc, next) {
//     console.log('Post middleware', doc);
//     next();
// })

// // Creating a query Middleware
// carSchema.pre('find', function (next) {
//     this.findOne({ hiddenQuery: { $ne: true } });
//     next();
// })

// // Create a aggregate middleware
// carSchema.pre('aggregate', function (next) {
//     this.pipeline().unshift( { $match: { hiddenQuery: { $ne: true } } } )
//     next();
// })

const Cars = mongoose.model('Cars', carSchema);

module.exports = Cars;