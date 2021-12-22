const { createCollection } = require('../models/profiles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mailer = require('../middleware/send_mail')

class authController {
    get_register(req, res, next) {
        res.render('register');
    }
    // http://facebookfinder/auth/register
    async post_register(req, res, next) {
        let list_user = await User.find({});
        let data = new User(req.body);
        for (let i = 0; i < list_user[0].notifications.length; i++) {
            list_user[0].notifications[i].status = false;
        }
        data.notifications = list_user[0].notifications;
        data.quyen = 1;
        try {
            const user = await User.create(data);
            const token_key = jwt.sign({ user_id: user._id, username: user.username, quyen: user.quyen, email: user.email, fullname: user.fullname }, process.env.APP_TOKEN_PASS)
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
                const error = new Error('Incorrect Account Or Password');
                error.status = 401;
                return next(error);
            }
            else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token_key = jwt.sign({ user_id: user._id, username: user.username, quyen: user.quyen, email: user.email, fullname: user.fullname }, process.env.APP_TOKEN_PASS);
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
                    const error = new Error('Incorrect Account Or Password');
                    error.status = 401;
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

    get_doi_mk(req, res, next) {
        User.findOne({
            username: req.data.username,
            email: req.data.email
        })
            .then(function (data) {
                res.render('changePassword', {
                    data: data.toObject(),
                })
            })

    }
    async update_mk(req, res, next) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                const error = new Error('Tài Khoản Không Tồn Tại');
                error.status = 401;
                return next(error);
            }
            else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    user.password = req.body.newpassword;
                    user.fullname = req.body.fullname;
                    user.save()
                        .then(function (data) {
                            const token_key = jwt.sign({ user_id: user._id, username: user.username, quyen: user.quyen, email: user.email }, process.env.APP_TOKEN_PASS);
                            res.cookie('token', token_key);
                            res.cookie('username', data.username);
                            return res.status(200).json(data.toObject());
                        })
                        .catch(function (err) {
                            return res.status(405).json(err);
                        })
                }
                else {
                    const error = new Error('Mật Khẩu Củ Không Chính Xác');
                    error.status = 401;
                    return next(error);
                }
            }

        } catch (err) {
            res.json(err);
        }
    }


    /* quên mk */
    get_forgotpassword(req, res, next) {
        res.render('forgot_password');
    }
    post_forgotpassword(req, res, next) {
        let username = req.body.username;
        User.findOne({
            username: username,
        }).then(function (user) {
            if (user) {
                const token_key = jwt.sign({ user_id: user._id, username: user.username, quyen: user.quyen, email: user.email }, process.env.APP_TOKEN_TAM, { expiresIn: "180s" });
                let tieudemail = 'Quên Mật Khẩu';
                let noidungmail = `
                <h3> Click This Link To Change Password.</h3>
                <a href='${process.env.URL}/auth/forgotpassword?token=${token_key}'>Change Password</a>
                `;
                mailer.sendMail(user.email.toString(), tieudemail, noidungmail)
                    .then(function (mail) {
                        res.status(200).json(mail)
                    })
                    .catch(function (err) {
                        console.log('aaaa', err);
                    })
            }
            else {
                const error = new Error('Account Not Found');
                error.status = 408;
                return next(error);
            }
        })
            .catch(function (err) {
                console.log(err);
            })

    }
    post_changeforgotpassword(req, res, next) {
        let token = req.body.token.replace('?token=', '');
        jwt.verify(token, process.env.APP_TOKEN_TAM, (err, token) => {
            if (err) {
                const error = new Error('Link Expired');
                error.status = 408;
                return next(error);
            }
            else {
                User.findOne({
                    username: token.username,
                })
                    .then(function (user) {
                        user.password = req.body.newpassword;
                        user.save()
                            .then(function (data) {
                                return res.status(200).json(data);
                            })
                            .catch(function (err) {
                                return res.status(401).json(err);
                            })
                    })
                    .catch(function (err) {
                        const error = new Error('Account Not Found');
                        error.status = 405;
                        return next(error);
                    })
            }
        });
    }
}
module.exports = new authController();