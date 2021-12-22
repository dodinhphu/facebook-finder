const data_traning = require('../models/data_traning');
class faceapiController {
    // http://facebookfinder/faceapi/show
    show(req, res, next) {
        data_traning.find({}).then(function (data) {
            let db = [];
            data.map(function (data_traning) {
                db.push(data_traning.data)
            })
            return res.json(db);
        })
            .catch(function (err) {
                next(err);
            })
    }
}
module.exports = new faceapiController();