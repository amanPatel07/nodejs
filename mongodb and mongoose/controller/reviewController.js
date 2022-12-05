const asyncCatch = require('./../utils/asyncErrorHandler');
const Review = require('./../model/reviewModel');
const factory = require('./handlerFactory');

exports.setCarUserId = (req, res, next) => {
    /**
     * Allow Nested Route 
     */
     if (!req.body.car) req.body.car = req.params.carId;
     if (!req.body.user) req.body.user = req.user.id;
     next();
}

exports.getAllReviews = factory.getAllDoc(Review);
exports.getReview = factory.getDoc(Review, false, '-__v');
exports.deleteReview = factory.deleteOne(Review);
exports.createReview = factory.createDoc(Review);
exports.updateReview = factory.updateOne(Review);


/*
exports.getAllReviews = asyncCatch(async (req, res, next) => {
    let filter = {};
    if (req.params.carId) filter = { car: req.params.carId }

    const reviews = await Review.find(filter).select('-__v');
    res.status(200)
        .json({
            reviews
        });
});
exports.createReview = asyncCatch(async (req, res, next) => {

     * Allow Nested Route 
     *
    if (!req.body.car) req.body.car = req.params.carId;
    if (!req.body.user) req.body.user = req.user.id;

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
});
*/