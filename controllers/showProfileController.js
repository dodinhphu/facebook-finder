const profile = require('../models/profiles');
const user = require('../models/user');
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
    // http://facebookfinder/show/details/:id
    async getshow_details(req, res, next) {
        let profile_details = await profile.findOne({ profile_id: req.params.id_profile });
        if (profile_details) {
            let nguoitruycap = await user.findOne({ username: req.data.username })
            if (nguoitruycap) {
                if (nguoitruycap.history.length > 10) {
                    nguoitruycap.history.pop();
                }
                var kt = false;
                var index;
                await nguoitruycap.history.forEach(function (value, i) {
                    if (value === profile_details.profile_id) {
                        kt = true;
                        index = i;
                    }
                })
                if (kt == false) {
                    nguoitruycap.history.unshift(profile_details.profile_id);
                    await user.updateOne({
                        username: req.data.username
                    }, {
                        history: nguoitruycap.history
                    })
                }
                 else {
                     nguoitruycap.history.splice(index, 1);
                     nguoitruycap.history.unshift(profile_details.profile_id);
                     await user.updateOne({
                         username: req.data.username
                     }, {
                         history: nguoitruycap.history
                     })
                 }
            }
            profile_details = profile_details.toObject();
            res.render('show_details', {
                data: profile_details,
            })
        }
        else {
            const error = new Error('Trang Không Tồn Tại !!!');
            error.status = 404;
            return next(error);
        }
    }
    // get http://facebookfinder/show/list/
    async get_show_list(req, res, next) {
        res.render('list_profile');
    }
    // post http://facebookfinder/show/list/
    async post_show_list(req, res, next) {
        let data = JSON.parse(req.body.data);
        let list_profile = [];
        for (let i = 0; i < data.length; i++) {
            await profile.findOne({
                profile_id: data[i]
            })
                .then(profile => {
                    list_profile.push(profile.toObject());
                })
                .catch(err => {
                    const error = new Error('lỗi ở list profile !!!');
                    error.status = 405;
                    return next(error);
                })
        }
        res.render('list_profile', {
            data: list_profile
        })

    }
}
module.exports = new showProfile();