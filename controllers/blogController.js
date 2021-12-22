class blogController {
    // http://facebookfinder/home
    show(req, res, next) {
        return res.render('blog');
    }
}
module.exports = new blogController();