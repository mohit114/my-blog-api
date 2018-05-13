const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    Title: {type: String, required: true},
    AddedDate: {type: Date, default: Date.now},
    AddedBy: {type: String, required: true},
    TopImageUrl: {type: String},
    Body: {type: String, required: true},
    SideImageUrl: {type: String},
    IsNew: {type: Boolean, default: true},
    IsHighRated: {type: Boolean, default: false}
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;