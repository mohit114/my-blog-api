const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const contactModel = require('../models/contact');

router.get('/', (req, res, next) => {
    res.status(200).json({
       "Title": "Welcome to blog api"
    });
});

router.get('/user', (req, res, next) => {
   userModel.findOne({'username' : 'mohitmaharjan7@gmail.com'}, function(err, user){
        if(user)
            res.status(200).json(user);
        });
});


router.post('/add', (req, res, next) => {
    userModel.findOne({'username':req.body.username}, function(err, user){
        //check if user exists. if exists return the user
        if(user){
            res.status(200).json({'existing_user': user});
        }
        // if user does not exists then create a new user and return that newly created user
        else{
            var newUser = new userModel({
                name: req.body.name,
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                isAdmin : req.body.isAdmin,
                createdDate: Date.now(),
                isLocked: req.body.isLocked
            });
            newUser.save().then(result => {
                res.status(200).json({'newlyAddedUser': result});
            }).catch(err => {
                res.status(400).send("Unable to save to database. Error : " + err.message);
            });
        }
    });
});

router.post('/contact', (req, res, next) => {
    var newContact = new contactModel({
        fullName: req.body.fullName,
        email: req.body.email,
        contact: req.body.contact,
        subject : req.body.subject,
        message: req.body.message
    });
    newContact.save().then(result => {
        res.status(200).json({'newlyAddedUser': result});
    }).catch(err => {
        res.status(400).send("Unable to save to database. Error : " + err.message);
    });

});

module.exports = router;