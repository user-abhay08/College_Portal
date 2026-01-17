const express = require('express');
const router = express.Router();
const {
    uploadResource,
    getResources,
    getResource,
    likeResource,
    dislikeResource,
    deleteResource
} = require('../controllers/resourceController');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// Public route - get resources
router.get('/', getResources);
router.get('/:id', getResource);

// Protected routes
router.post('/', auth, upload.single('file'), uploadResource);
router.put('/:id/like', auth, likeResource);
router.put('/:id/dislike', auth, dislikeResource);
router.delete('/:id', auth, deleteResource);

module.exports = router;
