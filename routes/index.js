const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const contactModel = require('../models/contact');

router.get('/', (req, res, next) => {
    res.status(200).json({
       "Title": "Welcome to blog api"
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

router.get('/messages',(req, res, next) => {
    contactModel.find({}, (err, messages) => {        
        if(err)
            res.status(400).send("Unable to get notification messages : " + err.message);
        else 
            res.status(200).send(messages);
    })
})

module.exports = router;