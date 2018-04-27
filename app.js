const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const db = require('./config/db');
const indexRouter = require('./routes/index');
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', indexRouter);
mongoose.Promise = global.Promise;
mongoose.connect(db.databaseURI).then(() => {
    console.log('Successfully connected to the database.');
            const server = app.listen(port, () => {
            console.log('Listening on port ' + port);
        });
    }, err => {console.log('Could not connect to the databse. Error : ' + err)}
);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  
  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    //res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500).json({
        "errormessage" : err.message
    })
});
process.on('uncaughtException', (err) => {
    console.log('Error has occurred in the server. Error details : ' + err);
});

