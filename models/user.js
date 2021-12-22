const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;
const user = new Schema({
    username: { type: String, unique: true, trim: true, required: [true, 'User Name Already Exists'] },
    email: { type: String, unique: true, trim: true, required: [true, 'Email Already Exists'] },
    password: { type: String, trim: true, minLength: [6, 'Password Must Be Over 6 Characters'] },
    fullname: { type: String, unique: true, trim: true },
    quyen: { type: Number, default: 1 },
    notifications: { type: Array, default: [] },
    history: { type: Array, default: [] },
    ngaytao: { type: String, default: new Date().toDateString() }
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