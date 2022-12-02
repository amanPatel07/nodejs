const mongoose = require('mongoose');

const User = require('./../model/userModel');

const saleModel = new mongoose.Schema(
    {
        carPurchase: {
            type: mongoose.Schema.ObjectId,
            ref: 'Cars',
            required: [true, 'The car is required']
        },
        ownedBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'The owner is required']
        },
        purchaseDate: Date,

    }
);

const Sale = mongoose.model('Sale', saleModel);

module.exports = Sale;