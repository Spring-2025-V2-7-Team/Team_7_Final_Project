const express = require('express');
const router = express.Router();
const moderationController = require('../controllers/moderationController');
const authenticate = require('../middleware/auth');
const requireAdmin = require('../middleware/admin');

router.use(authenticate);
router.use(requireAdmin);

router.get('/flagged-posts', moderationController.getFlaggedPosts);
router.get('/reported-users', moderationController.getReportedUsers);

router.patch('/ignore-user/:id', moderationController.ignoreUser);
router.patch('/approve-post/:id', moderationController.approvePost);
router.delete('/delete-post/:id', moderationController.deletePost);
router.patch('/ban-user/:id', moderationController.banUser);

module.exports = router;