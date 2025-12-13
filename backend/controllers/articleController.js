const Article = require('../models/Article');
const { fetchLiveNews } = require('../services/newsService');

// @desc    Get all articles with optional topic filter (LIVE from NewsData.io)
// @route   GET /api/articles?topic=tech&page=1&pageSize=10
// @access  Public
const getArticles = async (req, res) => {
    try {
        const { topic, page, pageSize } = req.query;

        // Fetch live news from NewsData.io
        const articles = await fetchLiveNews(
            topic || 'general',
            parseInt(page) || 1,
            parseInt(pageSize) || 10
        );

        res.json({
            success: true,
            count: articles.length,
            data: articles,
            source: 'NewsData.io Live Feed',
        });
    } catch (error) {
        res.status(503).json({
            success: false,
            message: error.message || 'Unable to fetch live news from NewsData.io',
        });
    }
};

// @desc    Get single article by ID (not supported for live news - use URL instead)
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = async (req, res) => {
    try {
        // For live news, we can't fetch by ID
        // Check if it's a saved article in our database
        const savedArticle = await Article.findById(req.params.id);

        if (savedArticle) {
            res.json({
                success: true,
                data: savedArticle,
                source: 'Saved Article',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Article not found. For live articles, please use the article URL directly.',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getArticles,
    getArticleById,
};
