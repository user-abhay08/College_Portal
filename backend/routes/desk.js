const express = require('express');
const router = express.Router();
const { getDesk, updateDesk } = require('../controllers/deskController');
const auth = require('../middleware/auth');

// Protected routes
router.get('/', auth, getDesk);
router.put('/', auth, updateDesk);

module.exports = router;
