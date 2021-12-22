const feedback = require('../models/feedback');
class contractController {
    get_show(req, res, next) {
        return res.render('contact',{
            data:req.data
        });
    }
    post_contact(req, res, next) {
        feedback.create(req.body)
        .then(function(data) {
            res.status(200).json(data);
        })
        .catch(function(err) {
           next(err);
        })
    }
}
module.exports = new contractController();