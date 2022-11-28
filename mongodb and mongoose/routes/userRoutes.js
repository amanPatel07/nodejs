const express = require('express');
const userController = require('./../controller/authController');
const router = express.Router();

router
    .post('/', userController.signup)

module.exports = router