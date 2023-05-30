require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.MONGODB_URL;

const connectToDb = async () => {
    mongoose.set('strictQuery', false)
    try {
        return await mongoose.connect(url, () => console.log("Connected to Database"))
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDb