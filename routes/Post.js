const router = require('express').Router();
const Post = require('../models/Post');
const FetchUser = require('../utils/FetchUser');


/* GET ALL POSTS */
router.get('/allPosts', async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "-password");

        if (!posts) {
            res.status(400).json({
                success: false,
                message: "No Posts found!"
            })

            return;
        }

        res.status(200).json({ posts, count: posts.length });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `${error.message}`
        })
    }
});


/* CREATE POST */
router.post('/addPost', FetchUser, async (req, res) => {
    const { title, description, image } = req.body;

    try {

        if (!title || !description || !image) {
            res.status(400).json({
                success: false,
                message: "All fields are required!"
            })

            return;
        }

        var post = await Post.create({ user: req.user._id, title, description, image });
        post = await Post.findById(post._id).populate('user', "-password");

        res.status(200).json({ success: true, post });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `${error.message}`
        })
    }
});


/* GET SINGLE POST */
router.get('/getPost/:id', async (req, res) => {
    try {

        var post = await Post.findById(req.params.id).populate('user', '-password   ');
        if (!post) {
            res.status(400).json({
                success: false,
                message: "No post exists!"
            })

            return;
        }

        res.status(200).json({ success: true, post });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `${error.message}`
        })
    }
});


/* UPDATE POST */
router.put('/updatePost/:id', FetchUser, async (req, res) => {
    const { title, description, image } = req.body;

    try {

        var post = await Post.findByIdAndUpdate(req.params.id, {
            title, description, image
        }, { new: true });
        post = await Post.findById(post._id).populate('user', "-password");

        res.status(200).json({ success: true });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `${error.message}`
        })
    }

})


/* DELETE POST */
router.delete('/deletePost/:id', FetchUser, async (req, res) => {
    try {

        var post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, post });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `${error.message}`
        })
    }
})


/* USER POSTS */
router.get('/userPosts', FetchUser, async (req, res) => {
    try {

        var posts = await Post.find({ user: req.user._id }).populate("user", "-password");
        res.status(200).json({ success: true, posts });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `${error.message}`
        })
    }
})


module.exports = router;