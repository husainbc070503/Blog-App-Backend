const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: "https://static.thenounproject.com/png/12017-200.png"
    },

}, {
    timestamps: true
});

const User = mongoose.model('user', UserSchema);

module.exports = User;