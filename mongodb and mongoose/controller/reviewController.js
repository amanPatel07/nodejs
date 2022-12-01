const asyncCatch = require('./../utils/asyncErrorHandler');
const Review = require('./../model/reviewModel')

exports.getAllReviews = asyncCatch(async (req, res, next) => {
    const reviews = await Review.find().select('-__v');
    res.status(200)
        .json({
            reviews
        });
});

exports.createReview = asyncCatch(async (req, res, next) => {
    const newReview = await Review.create(req.body);
    res.status(201)
        .json({
            newReview
        });
});

exports.getReview = asyncCatch(async (req, res, next) => {
    const review = await Review.findById(req.params.id)
        .populate(
            {
                path: 'user',
                select: 'name'
            }
        )
        .populate(
            {
                path: 'car',
                select: 'name'
            }
        )
        .select('-__v');
    res.status(200)
        .json({
            review
        })
})