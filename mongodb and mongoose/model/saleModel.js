const mongoose = require('mongoose');
const User = require('./../model/userModel');

const saleModel = new mongoose.Schema(
    {
        carPurchase: {
            type: mongoose.Schema.ObjectId,
            ref: 'Cars'
        },
        ownedBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        purchaseDate: Date,

    }
);

saleModel.pre('save', async function (next) {
    console.log(this.ownedBy)
    const updateUser = await User.findById(this.ownedBy)
    // console.log(updateUser)
    next()
})

const Sale = mongoose.model('Sale', saleModel);

module.exports = Sale;