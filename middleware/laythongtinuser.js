const jwt = require("jsonwebtoken");
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
                res.locals.kt = true;
                res.locals.userdangnhap = req.cookies.username;
                next();
            }
        });
    }
}
module.exports = lay_tt_user;