const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'The name field is required']
        },
        email: {
            type: String,
            required: [true, 'The email field is required'],
            unique: true,
            validate: [validator.isEmail, 'Invalid email']
        },
        password: {
            type: String,
            required: [true, 'The password field is required'],
            minlength: [8, 'The minimum length for the password should be 8'],
            select: false
        },
        confirmPassword: {
            type: String,
            required: [true, 'The confirm password field is required'],
            validate: {
                validator: function (item) {
                    return item === this.password
                },
                message: "The confirm password should match the password."
            }
        },
        passwordChangedAt: {
            type: Date
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        },
        car_purchase_details: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Sale'
            }
        ]
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

/** For embedding the sub document 
*userSchema.pre('save', async function (next) {
    const carPromise = this.cars_own.map(async (id) => await Sale.findById(id));
    this. cars_own = await Promise.all(carPromise);
    console.log(this.cars_own)
    next();
})
*/


userSchema.methods.checkPassword = async function (currentPassword, userPassword) {
    return await bcrypt.compare(currentPassword, userPassword)
}

userSchema.methods.isPasswordChangedAfter = function (JwtTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        return JwtTimeStamp < changedTimeStamp
    }
    return false;
}

userSchema.methods.updateUserPurchaseDetails = async function (carSold) {
    console.log(carSold, this.car_purchase_details)
    await this.car_purchase_details.push(carSold._id)
    return this.car_purchase_details
}

const User = mongoose.model('User', userSchema);

module.exports = User;