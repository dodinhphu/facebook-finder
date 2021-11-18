const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;
const user = new Schema({
    username: { type: String, unique: true, trim: true, required: [true, 'User Name Đã Tồn Tại'] },
    email: { type: String, unique: true, trim: true, required: [true, 'Email Đã Tồn Tại'] },
    password: { type: String, trim: true, required: [true, 'pasword must be required'], minLength: [6, 'Mật Khẩu Phải Trên 6 Kí tự'] },
    fullname: { type: String, unique: true, trim: true },
});
user.pre('save', function (next) {
    let user = this;
    bcryptjs.hash(user.password, 10, function (err, data) {
        if (err) return next(err);
        else {
            user.password = data;
            next();
        }
    })
})
module.exports = mongoose.model('user', user); 