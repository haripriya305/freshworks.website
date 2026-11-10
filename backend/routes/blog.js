const express = require('express');
const router = express.Router();
const { listPosts, getPost } = require('../controllers/blogController');

router.get('/', listPosts);
router.get('/:slug', getPost);

module.exports = router;
