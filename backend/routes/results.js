const express = require('express');
const router = express.Router();
const {
    declareResults,
    getStudentResults,
    getMyResults
} = require('../controllers/resultController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Protected routes
router.get('/my-results', auth, getMyResults);
router.get('/student/:studentId', auth, getStudentResults);

// Admin only routes
router.post('/', auth, adminAuth, declareResults);

module.exports = router;
