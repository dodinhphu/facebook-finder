const profile = require('../models/profiles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class showProfile {
    // http://facebookfinder/showprofile
    async getshow(req, res, next) {
        const listprofile = await profile.find({});
        res.status(200).json({
            status: 'success',
            data: { listprofile }
        })
    }
    // http://facebookfinder/show/id
    async getshow_details(req, res, next) {
        let profile_details = await profile.findOne({ profile_id: req.params.id_profile });
        if (profile_details) {
          /*   res.status(200).json({
                status: 'success',
                data: { profile_details }
            }) */
            profile_details = profile_details.toObject();
            res.render('show_details',{
                data: profile_details,
            })
        }
        else {
            const error = new Error('Trang Không Tồn Tại !!!');
            error.status = 404;
            return next(error);
        }
    }
}
module.exports = new showProfile();