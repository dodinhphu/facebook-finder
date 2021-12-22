const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const feedback = new Schema({
    username: String,
    email: String,
    fullname: String,
    number_phone: String,
    Subject: String,
    content_feedback: String,
    status:{type:Boolean,default:false},
    ngayFeedback: { type: String, default: new Date().toDateString() },
});

module.exports = mongoose.model('feedback', feedback);