const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
    email: {type: String, required:true, unique: true},
    subscribedDate: {type: Date, default: Date.now}
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;