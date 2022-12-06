const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String
        },
        rating: {
            type: Number,
            min: [1, 'The minimum rating should be 1.'],
            max: [5, 'The maximun rating should be 5.']
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

reviewSchema.index({ car: 1, user: 1 }, { unique: true })

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;