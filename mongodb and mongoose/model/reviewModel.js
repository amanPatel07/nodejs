const mongoose = require('mongoose');

const reviewModel = new mongoose.Schema(
    {
        review: {
            type: String
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        car: {
            type: mongoose.Schema.ObjectId,
            ref: 'Cars'
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    }
);

const Review = mongoose.model('Review', reviewModel);

module.exports = Review;