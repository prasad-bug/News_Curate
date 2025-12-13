const express = require('express');
const { getArticles, getArticleById } = require('../controllers/articleController');
const { saveArticle, getSavedArticles, unsaveArticle } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getArticles);
router.get('/:id', getArticleById);

// Protected routes
router.post('/save', authMiddleware, saveArticle);
router.delete('/unsave/:id', authMiddleware, unsaveArticle);
router.get('/saved/list', authMiddleware, getSavedArticles);

module.exports = router;
