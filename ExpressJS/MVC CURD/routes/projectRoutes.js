const express = require('express');
const projectController = require('./../controller/projectController');

const router = express.Router();

router.param('id', projectController.checkId);

router
    .route('/')
    .get(projectController.getAllProject)
    .post(projectController.checkBody, projectController.postProject);

router
    .route('/:id')
    .get(projectController.getProject)
    .patch(projectController.patchProject)
    .delete(projectController.deleteProject);

module.exports = router;