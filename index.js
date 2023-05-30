require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./connection/db');
const app = express();
const port = process.env.PORT

connectToDb();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send("Hello World!"));
app.use('/api/user', require('./routes/Auth'))
app.use('/api/blog', require('./routes/Post'))
app.use('/api/comments', require('./routes/Comments'))

app.listen(port, () => console.log(`Serving running on port ${port}`));
