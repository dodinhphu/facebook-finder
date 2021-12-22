const jwt = require("jsonwebtoken");
kt_dangNhap = (req, res, next) => {
    const authorization = req.cookies.token;
    if (!authorization) {
       /*  const error = new Error('Vui Lòng Đăng Nhập Để Sử Dụng Chức Năng Này !!!!!');
        error.status = 401;
        next(error); */
        res.clearCookie('token');
        res.clearCookie('username');
        return next();
    }
    else {
        const token = authorization.trim();
        jwt.verify(token, process.env.APP_TOKEN_PASS, (err, token) => {
            if (err) {
               /*  const error = new Error('Yêu Cầu Quyền Truy Cập !!!!!');
                error.status = 401;
                next(error); */
                res.clearCookie('token');
                res.clearCookie('username');
                return next();
            }
            else {
                return res.redirect('/home');
            }
        });
    }
}
module.exports = kt_dangNhap;