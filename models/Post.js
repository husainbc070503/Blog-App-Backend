const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
        default: "https://growthnodes.com/blog_default.png"
    }

}, {
    timestamps: true
})

const Post = mongoose.model('post', PostSchema);

module.exports = Post;