const express = require('express');

const reviewController = require('./../controller/reviewController');
const authController = require('./../controller/authController');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(
        authController.authUser,
        authController.restrictTo('user'),
        reviewController.createReview
    )
    
router
    .route('/:id')
    .get(reviewController.getReview)

module.exports = router;