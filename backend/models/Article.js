const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Please add content'],
        },
        summary: {
            type: String,
            required: [true, 'Please add a summary'],
        },
        topic: {
            type: String,
            required: [true, 'Please add a topic'],
            trim: true,
            lowercase: true,
        },
        source: {
            type: String,
            required: [true, 'Please add a source'],
            trim: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        // New fields for live news integration
        externalUrl: {
            type: String,
            trim: true,
            default: null,
        },
        imageUrl: {
            type: String,
            trim: true,
            default: null,
        },
        publishedAt: {
            type: Date,
            default: Date.now,
        },
        isCustom: {
            type: Boolean,
            default: true, // True for admin-created articles, false for saved live articles
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster topic queries
articleSchema.index({ topic: 1 });
articleSchema.index({ createdAt: -1 });
articleSchema.index({ externalUrl: 1 });

module.exports = mongoose.model('Article', articleSchema);
