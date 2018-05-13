const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const notificationModel = require('../models/messageNotification');
const subscriberModel = require('../models/subscriber');
const blogModel = require('../models/blog');

router.get('/', (req, res, next) => {
    res.status(200).json({
       "Title": "Welcome to blog api"
    });
});
router.post('/notification', (req, res, next) => {
    var newNotification = new notificationModel({
        fullName: req.body.fullName,
        email: req.body.email,
        contact: req.body.contact,
        subject : req.body.subject,
        message: req.body.message
    });
    newNotification.save().then(result => {
        res.status(200).json({'newlyAddedUser': result});
    }).catch(err => {
        res.status(400).send("Unable to save to database. Error : " + err.message);
    });

});

router.get('/messages',(req, res, next) => {
    notificationModel.find({}).sort({receivedDate: 'desc'}).exec((err, messages) => {        
        if(err)
            res.status(400).send("Unable to get notification messages : " + err.message);
        else 
            res.status(200).send(messages);
    })
});

router.put('/mark/:notificationid', (req, res, next) => {
    const body = {isRead: true, readDate: new Date().toISOString()};
    notificationModel.update({_id: req.params.notificationid}, body, function(err, msg){
         if(err)
            res.status(400).send( err.message);
         res.status(200).send(msg);
    });
})

router.post('/subscribe', (req, res, next) => {
    subscriberModel.find({email : req.body.email}).exec(function(err, user){
        if(user.length){
            res.status(200).json({'message' : 'You have already subscribed to my blog. Thank you.'})
        }
        else{
             var newSubscriber = new subscriberModel({
                email: req.body.email
            });
            newSubscriber.save().then(result => {
                res.status(200).json({'message': 'You have successfully subscribed to my blog. Thank you.'});
            }).catch(err => {
                res.status(400).send("Unable to add subscriber to database. Error : " + err.message);
            });
        }
    });
});

router.post('/addBlog', (req, res, next) => {
     var newBlog = new blogModel({
        Title: req.body.blogTitle,
        AddedBy: 'Mohit Maharjan',
        TopImageUrl: req.body.blogImageUrl,
        Snippet: req.body.blogSnippet,
        Body: req.body.blogBody,
        SideImageUrl : null
    });
     newBlog.save().then(result => {
        res.status(200).json({ error: false, message: 'Successfully added the blog.'});
     }).catch(err => {
        res.status(400).json({error: true, message: err.message});
     });
});

router.get('/blog/:id', (req, res, next) => {
     blogModel.findOne({'_id': req.params.id}).sort({AddedDate: 'desc'}).exec((err, blog) => {        
        if(err)
            res.status(400).send("Unable to fetch blog with id : " + req.params.id + ". Error : " + err.message);
        else 
            res.status(200).send(blog);
    })
})

router.get('/blog', (req, res, next) => {
     blogModel.find({'IsNew': true}).sort({AddedDate: 'desc'}).exec((err, blogs) => {        
        if(err)
            res.status(400).send("Unable to fetch blogs. Error : " + err.message);
        else 
            res.status(200).send(blogs);
    })
})

module.exports = router;