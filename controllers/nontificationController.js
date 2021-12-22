const user = require('../models/user');
class nontificationController {
    async get_show(req, res, next) {
        user.findOne({
            username: req.data.username
        })
            .then(function (u) {
                let data;
                let thaydoi = [];
                let list_notifications = u.notifications;
                list_notifications.forEach(function (value) {
                    if (value.id === req.query.id) {
                        data = value;
                        value.status = true;
                        thaydoi.push(value);
                    }
                    else {
                        thaydoi.push(value);
                    }
                })
                user.updateOne({
                    username: req.data.username
                }, {
                    notifications: thaydoi
                }).then(function (td) {
                    if (data) {
                        return res.render('notification', {
                            data: data,
                        })
                    }
                    else {
                        const error = new Error('Không Tìm Thấy Thông Báo');
                        error.status = 404;
                        return next(error);
                    }
                })
                .catch(function (err) {
                    return next(err);
                })

            })
            .catch(function (err) {
                return res.status(401).json(err);
            })

    }
}
module.exports = new nontificationController();