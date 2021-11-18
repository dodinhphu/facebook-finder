const { createCollection } = require('../models/profiles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
class authController {
    get_register(req, res, next) {
        res.render('register');
    }
    // http://facebookfinder/auth/register
    async post_register(req, res, next) {
        let data = new User(req.body);
        try {
            const user = await User.create(data);
            const token_key = jwt.sign({ user_id: user._id }, process.env.APP_TOKEN_PASS)
            res.status(200);
            res.cookie('token', token_key);
            res.cookie('username', user.username);
            return res.redirect('/home')
        } catch (err) {
            next(err);
        }
    }
    // http://facebookfinder/auth/login    Get
    get_login(req, res, next) {
        res.render('login');
    }
    // http://facebookfinder/auth/login    post
    async Post_login(req, res, next) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                const error = new Error('Tài Khoản Hoặc Mật Khẩu Không Chính Xác');
                error.status = 400;
                return next(error);
            }
            else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token_key = jwt.sign({ user_id: user._id }, process.env.APP_TOKEN_PASS);
                    res.status(200).json({
                        status: 'success',
                        data: {
                            token_key: token_key,
                            username: user.username,
                            prevlink: req.query.prevlink,
                        }
                    })
                }
                else {
                    const error = new Error('Tài Khoản Hoặc Mật Khẩu Không Chính Xác');
                    error.status = 400;
                    return next(error);
                }
            }

        } catch (err) {
            res.json(err);
        }
    }
    Post_logout(req, res, next) {

        try {
            res.clearCookie('token');
            res.clearCookie('username');
            return res.redirect('/auth/login')
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new authController();