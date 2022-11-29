const express = require('express');
const authController = require('./../controller/authController');
const userController = require('./../controller/userController');
const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router
    .route('/')
    .get(authController.authUser, userController.getUser)

module.exports = router