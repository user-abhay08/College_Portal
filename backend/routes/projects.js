const express = require('express');
const router = express.Router();
const {
    createProject,
    getProjects,
    getProject,
    updateProject,
    addMember,
    uploadProjectResource
} = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// Protected routes
router.post('/', auth, createProject);
router.get('/', auth, getProjects);
router.get('/:id', auth, getProject);
router.put('/:id', auth, updateProject);
router.post('/:id/members', auth, addMember);
router.post('/:id/resources', auth, upload.single('file'), uploadProjectResource);

module.exports = router;
