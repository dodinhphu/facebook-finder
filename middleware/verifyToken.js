const jwt = require("jsonwebtoken");


verifyToken = (req, res, next) => {
    const authorization = req.cookies.token;
    if (!authorization) {
        res.clearCookie('username');
        res.clearCookie('token');
        return res.redirect(`/auth/login?prevlink=${req.originalUrl}`);
    }
    else {
        const token = authorization.trim();
        jwt.verify(token, process.env.APP_TOKEN_PASS, (err, token) => {
            if (err) {
                res.clearCookie('token');
                res.clearCookie('username');
                return res.redirect(`/auth/login?prevlink=${req.originalUrl}`);
            }
            else {
                let data = {
                    username: token.username,
                    quyen: token.quyen,
                    email: token.email,
                    fullname: token.fullname
                }
                req.data = data;
                next();
            }
        });
    }
}
module.exports = verifyToken;
