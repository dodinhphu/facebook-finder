check_quyen = (req, res, next) => {
    if (req.data.quyen != 0) {
        res.clearCookie('username');
        res.clearCookie('token');
        return res.redirect(`/auth/login`);
    }
    else {
        next();
    }

}
module.exports = check_quyen;