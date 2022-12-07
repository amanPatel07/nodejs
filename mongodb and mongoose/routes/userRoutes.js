const express = require('express');

const authController = require('./../controller/authController');
const userController = require('./../controller/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.patch('/updatePassword', authController.authUser, authController.updatePassword);
router.patch('/updateMe', authController.authUser, userController.updateCurrentUser);
router.delete('/deleteMe', authController.authUser, userController.deleteCurrentUser)

router
    .route('/carPurchase')
    .post(userController.carPurchase)

router
    .route('/')
    .get(authController.authUser, userController.getAllUser)

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router