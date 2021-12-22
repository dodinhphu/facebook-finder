const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notification = new Schema({
    loai: String,
    tieude: String,
    noidung: String,
    thoigian: { type: String, default: new Date().toDateString() },
});

module.exports = mongoose.model('notification', notification);