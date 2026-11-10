const express = require('express');
const router = express.Router();
const { listUsers, updateUserRole, deleteUser, listMessages } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.use(protect, adminOnly);
router.get('/users', listUsers);
router.patch('/users/:id', updateUserRole);
router.delete('/users/:id', deleteUser);
router.get('/messages', listMessages);

module.exports = router;
