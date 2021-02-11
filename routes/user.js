const router = require('express').Router()
const User = require('../models/user')
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const verify = require('./verifyToken')

//Registeration
router.post('/register', (req, res) => {

    //Validate
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //check if name has a space it must
    if(req.body.name.indexOf(' ') >= 0); else
     return res.status(400).send("Provide Full Name with space");

    //trim extra spaces
    req.body.name = req.body.name.replace(/\s+/g,' ').trim();

    User.findOne({ email: req.body.email }, (err, exist) => {
        if (exist) {
            return res.status(400).send('Email Already Exist')
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                // Store hash in DB
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                })
                user.save((err, data) => {
                    if (err) return res.send(err)
                    jwt.sign({ _id: data._id }, process.env.privateKey, function(err, token) {
                        res.cookie('authtoken', token, {httpOnly: true}) 
                        res.json({_id:data._id,name:data.name})
                    })    
                })
            });
        })
    })
})

//Login
router.post('/login', (req, res) => {

    //Validate
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) return res.status(400).send('Invalid User or Password')

        bcrypt.compare(req.body.password, user.password, (err, matched) => {
            if (!matched) return res.status(400).send('Invalid User or Password')
            //Create a token
            jwt.sign({ _id: user._id }, process.env.privateKey, function(err, token) {
                res.cookie('authtoken', token, {httpOnly: true , sameSite: true}) 
                res.json({_id:user._id,name:user.name})                                                  
            });
        })
    })
})
// Is User Logged ins
router.get('/isAuthenticated',verify, (req,res) =>{
    res.send(true)
})

//Get user info at reload
router.get('/getUser', verify, (req,res) =>{
    User.findOne({ _id: req.user._id },'name', (err, user) => {
        if(err) return res.send(err)
        res.json(user)
    })

})

//Get user info at User info page
router.get('/getUserInfo/:id', (req,res) =>{
    User.findOne({ _id: req.params.id },'name email', (err, user) => {
        if(err) return res.send(err)        
        res.json(user)
    })
})

//Logout
router.get('/logout',(req,res) =>{
    res.clearCookie("authtoken");
    res.end();    
})

//Search for Users
router.get('/search/:query',(req,res) =>{
    User.find({ name: new RegExp(req.params.query, "i") }, 'name', (err, docs) => {
        if(err) return res.send(err)        
        res.json(docs)
    });
})


module.exports = router