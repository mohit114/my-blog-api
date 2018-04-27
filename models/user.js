const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    username: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    isAdmin : Boolean,
    createdDate: Date,
    updatedDate: Date,
    isLocked : Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User;