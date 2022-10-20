// import { express } from 'express';
const express = require('express');
const router = express.Router();
const projectListController = require('./../controller/projectListController');

router
    .route('/')
    .get(projectListController.getAllProjectList)

module.exports = router;