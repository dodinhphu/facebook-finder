class homeController {
    // http://facebookfinder/home
    show(req, res, next) {
        return res.render('home');
    }
}
module.exports = new homeController();