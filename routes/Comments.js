const router = require('express').Router();
const Comments = require('../models/Comments');
const FetchUser = require('../utils/FetchUser');

/* GET COMMENTS OF PARTICULAR POST */
router.get('/getAllComments/:id', async (req, res) => {
    try {

        const comments = await Comments.find({ post: req.params.id })
            .populate('user', '-password')
            .populate('post');

        res.status(200).json({ success: true, comments });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});

/* CREATE NEW COMMENT */
router.post('/addComment', FetchUser, async (req, res) => {
    const { comment, postId } = req.body

    try {

        var com = await Comments.create({ user: req.user._id, post: postId, comment })
        com = await Comments.findById(com._id)
            .populate('user', '-password')
            .populate('post');

        res.status(200).json({ success: true, com });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});


/* DELETE COMMENT */
router.delete('/deleteComment/:id', FetchUser, async (req, res) => {
    try {

        const com = await Comments.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true, com });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});

module.exports = router