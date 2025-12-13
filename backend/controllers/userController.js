const User = require('../models/User');
const Article = require('../models/Article');

// @desc    Get user preferences
// @route   GET /api/user/preferences
// @access  Private
const getPreferences = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('preferences');

        res.json({
            success: true,
            data: user.preferences,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update user preferences
// @route   PUT /api/user/preferences
// @access  Private
const updatePreferences = async (req, res) => {
    try {
        const { topics } = req.body;

        if (!topics || !Array.isArray(topics)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide topics as an array',
            });
        }

        const user = await User.findById(req.user._id);

        user.preferences.topics = topics;
        await user.save();

        res.json({
            success: true,
            data: user.preferences,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Save article to reading list
// @route   POST /api/articles/save
// @access  Private
const saveArticle = async (req, res) => {
    try {
        const { title, description, url, imageUrl, source, publishedAt, topic } = req.body;

        // Check if article with this URL already exists
        let article = await Article.findOne({ externalUrl: url });

        if (!article) {
            // Create new article entry for this live news article
            article = await Article.create({
                title,
                content: description,
                summary: description,
                topic: topic || 'general',
                source: source || 'Unknown',
                externalUrl: url,
                imageUrl,
                publishedAt,
                isCustom: false,
            });
        }

        const user = await User.findById(req.user._id);

        // Check if already saved
        if (user.savedArticles.includes(article._id)) {
            return res.status(400).json({
                success: false,
                message: 'Article already saved',
            });
        }

        user.savedArticles.push(article._id);
        await user.save();

        res.json({
            success: true,
            message: 'Article saved successfully',
            data: {
                articleId: article._id,
                savedCount: user.savedArticles.length,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Unsave/Remove article from reading list
// @route   DELETE /api/articles/unsave/:id
// @access  Private
const unsaveArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const user = await User.findById(req.user._id);

        // Check if article is in saved list
        const index = user.savedArticles.indexOf(articleId);
        if (index === -1) {
            return res.status(400).json({
                success: false,
                message: 'Article not in saved list',
            });
        }

        // Remove from saved articles
        user.savedArticles.splice(index, 1);
        await user.save();

        res.json({
            success: true,
            message: 'Article removed from saved list',
            data: {
                articleId,
                savedCount: user.savedArticles.length,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get saved articles
// @route   GET /api/articles/saved/list
// @access  Private
const getSavedArticles = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('savedArticles');

        res.json({
            success: true,
            count: user.savedArticles.length,
            data: user.savedArticles,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getPreferences,
    updatePreferences,
    saveArticle,
    unsaveArticle,
    getSavedArticles,
};
