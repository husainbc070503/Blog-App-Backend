const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require('bcryptjs');
const generateToken = require("../utils/GenerateToken");
const FetchUser = require("../utils/FetchUser");

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    let success = false;

    try {

        if (!email || !name || !password) {
            res.status(400).json({ success, error: "Please fill the required fields" });
            return;
        }

        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ success, error: "User already registered!" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        user = await User.create({ name, email, password: hash })

        if (user) {
            success = true;
            res.status(200).json({
                success,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    token: generateToken(user._id)
                }
            });

        } else {
            res.status(400).json({ success, error: "Failed to register!" })
        }

    } catch (error) {
        res.status(400).json({ success, error: error.message })
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let success = false;

    try {

        if (!email || !password) {
            res.status(400).json({ success, error: "Please fill the required fields" });
            return;
        }

        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ success, error: "No user found with such credentials. Please register" });
            return;
        }

        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            res.status(400).json({ success, error: "Invalid Credentials" });
            return;
        }

        success = true;
        res.status(200).json({
            success,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                token: generateToken(user._id)
            }
        });

    } catch (error) {
        res.status(400).json({ success, error: error.message })
    }
});

router.put('/updateProfile', FetchUser, async (req, res) => {
    const { name, email, image } = req.body;

    try {

        const user = await User.findByIdAndUpdate(req.user._id, {
            name, email, image
        }, { new: true });

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                token: generateToken(user._id)
            }
        });

    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
})

module.exports = router;