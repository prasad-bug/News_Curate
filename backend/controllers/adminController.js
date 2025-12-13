const Article = require('../models/Article');
const User = require('../models/User');
const Topic = require('../models/Topic');

// @desc    Create new article
// @route   POST /api/admin/article
// @access  Private/Admin
const createArticle = async (req, res) => {
    try {
        const { title, content, summary, topic, source } = req.body;

        // Validation
        if (!title || !content || !summary || !topic || !source) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        const article = await Article.create({
            title,
            content,
            summary,
            topic: topic.toLowerCase(),
            source,
        });

        // Update or create topic
        let topicDoc = await Topic.findOne({ name: topic.toLowerCase() });
        if (topicDoc) {
            topicDoc.popularity += 1;
            await topicDoc.save();
        } else {
            await Topic.create({ name: topic.toLowerCase(), popularity: 1 });
        }

        res.status(201).json({
            success: true,
            data: article,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get topic statistics
// @route   GET /api/admin/topics/stats
// @access  Private/Admin
const getTopicStats = async (req, res) => {
    try {
        // Get article counts by topic
        const stats = await Article.aggregate([
            {
                $group: {
                    _id: '$topic',
                    views: { $sum: '$views' },
                    articleCount: { $sum: 1 },
                },
            },
            {
                $project: {
                    topic: '$_id',
                    views: 1,
                    articleCount: 1,
                    _id: 0,
                },
            },
            {
                $sort: { views: -1 },
            },
        ]);

        res.json({
            success: true,
            count: stats.length,
            data: stats,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');

        res.json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update article
// @route   PUT /api/admin/article/:id
// @access  Private/Admin
const updateArticle = async (req, res) => {
    try {
        const { title, content, summary, topic, source } = req.body;
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found',
            });
        }

        article.title = title || article.title;
        article.content = content || article.content;
        article.summary = summary || article.summary;
        article.topic = topic ? topic.toLowerCase() : article.topic;
        article.source = source || article.source;

        await article.save();

        res.json({
            success: true,
            data: article,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete article
// @route   DELETE /api/admin/article/:id
// @access  Private/Admin
const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found',
            });
        }

        await article.deleteOne();

        res.json({
            success: true,
            message: 'Article removed',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/user/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Prevent admin from deleting themselves check could be added here

        await user.deleteOne();

        res.json({
            success: true,
            message: 'User removed',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Block/Unblock user
// @route   PUT /api/admin/block-user/:id
// @access  Private/Admin
const blockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Toggle blocked status
        user.isBlocked = !user.isBlocked;
        await user.save();

        res.json({
            success: true,
            message: user.isBlocked ? 'User blocked' : 'User unblocked',
            data: { _id: user._id, isBlocked: user.isBlocked }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createArticle,
    getTopicStats,
    getAllUsers,
    updateArticle,
    deleteArticle,
    deleteUser,
    blockUser,
};
