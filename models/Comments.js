const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },

    comment: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Comments = mongoose.model('comment', CommentSchema);

module.exports = Comments