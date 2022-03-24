const express = require('express');
var cookieParser = require('cookie-parser')
const userroute = require('./routes/user')
const postroute = require('./routes/post')
const friendsroute = require('./routes/friends')
const mongoose = require('mongoose')
const path = require("path")
//dev
// const dotenv = require('dotenv')
// var cors = require('cors')

// dotenv.config();

const app = express();
//dev
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(cookieParser())

mongoose.connect(process.env.key,
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
() => console.log('Database Connected') 
)

app.use(express.json())

app.use('/api/user',userroute)
app.use('/api/post',postroute)
app.use('/api/friends',friendsroute)
//double duty
app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))