const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    Title: {type: String, required: true},
    AddedDate: {type: Date, required: true},
    AddedYear: {type: String, required: true},
    AddedMonth: {type: String, required: true},
    AddedBy: {type: String, required: true},
    TopImageUrl: {type: String},
    Snippet: {type: String, required: true},
    Body: {type: String, required: true},
    SideImageUrl: {type: String},
    IsNew: {type: Boolean, default: true},
    IsHighRated: {type: Boolean, default: false}
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;