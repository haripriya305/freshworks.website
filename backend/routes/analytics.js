const express = require('express');
const router = express.Router();
const { summary } = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

router.get('/summary', protect, summary);

module.exports = router;
