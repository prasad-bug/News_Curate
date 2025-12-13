const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a topic name'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        popularity: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Topic', topicSchema);
