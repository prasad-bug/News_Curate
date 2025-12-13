const express = require('express');
const {
    createArticle,
    getTopicStats,
    getAllUsers,
    updateArticle,
    deleteArticle,
    deleteUser,
    blockUser,
} = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// All admin routes require authentication and admin role
// All admin routes require authentication and admin role
router.post('/article', authMiddleware, adminMiddleware, createArticle);
router.put('/article/:id', authMiddleware, adminMiddleware, updateArticle);
router.delete('/article/:id', authMiddleware, adminMiddleware, deleteArticle);

router.get('/topics/stats', authMiddleware, adminMiddleware, getTopicStats);

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/user/:id', authMiddleware, adminMiddleware, deleteUser);
router.put('/block-user/:id', authMiddleware, adminMiddleware, blockUser);

module.exports = router;
