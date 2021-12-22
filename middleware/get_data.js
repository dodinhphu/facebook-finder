const jwt = require("jsonwebtoken");
const user = require("../models/user");
lay_tt_user = (req, res, next) => {
    const authorization = req.cookies.token;
    if (!authorization) {
        res.locals.kt = false;
        return next();
    }
    else {
        const token = authorization.trim();
        jwt.verify(token, process.env.APP_TOKEN_PASS, (err, token) => {
            if (err) {
                res.locals.kt = false;
                return next();
            }
            else {
                user.findOne({ username: req.cookies.username })
                    .then(function (data) {
                        let dadoc = [];
                        let chuadoc = [];
                        for (let i = 0; i < data.notifications.length; i++) {
                            if (data.notifications[i].status === true) {
                                dadoc.push(data.notifications[i])
                            }
                            else if (data.notifications[i].status === false) {
                                chuadoc.push(data.notifications[i])
                            }
                        }
                        res.locals.totalNotifications = data.notifications.length;
                        res.locals.notification_dadoc = dadoc;
                        res.locals.notification_chuadoc = chuadoc;
                        res.locals.kt = true;
                        res.locals.userdangnhap = req.cookies.username;
                        res.locals.quyen = token.quyen;
                        next();
                    })

            }
        });
    }
}
module.exports = lay_tt_user;