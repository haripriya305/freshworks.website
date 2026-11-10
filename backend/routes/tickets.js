const express = require('express');
const router = express.Router();
const { listTickets } = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

router.get('/', protect, listTickets);

module.exports = router;
