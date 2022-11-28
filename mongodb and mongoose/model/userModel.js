const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

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
            minlength: [8, 'The minimum length for the password should be 8']
        },
        confirmPassword: {
            type: String,
            required: [true, 'The confirm password field is required'],
            validate: {
                validator: function(item) {
                    return item === this.password
                },
                message: "The confirm password should match the password."
            }
        }
    }
);

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;