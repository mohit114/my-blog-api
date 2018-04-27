const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
	fullName: {type: String, required: true},
	email: {type: String, required: true},
	contact: {type: String},
	subject: {type: String},
	message: {type: String}
})

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;