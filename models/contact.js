const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
	fullName: {type: String, required: true},
	email: {type: String, required: true},
	contact: {type: String},
	subject: {type: String},
	message: {type: String},
	receivedDate: {type: Date, default: Date.now},
	isRead: {type: Boolean, default: false},
	readDate: {type: Date}
})

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;