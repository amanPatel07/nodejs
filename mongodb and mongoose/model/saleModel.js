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

const Sale = mongoose.model('Sale', saleModel);

module.exports = Sale;