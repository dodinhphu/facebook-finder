const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const profile = require('../models/profiles');
const user = require('../models/user');
const data_tranning = require('../models/data_traning');
const feedback = require('../models/feedback');
class adminController {
    get_total_page_user(req, res, next) {
        let a = [];
        const PAGE_ITEAM = 5;
        let page = req.query.page;
        if (!parseInt(page) || parseInt(page) < 1 || !page) {
            page = '1';
        }
        page = parseInt(page);
        let skip = (page - 1) * PAGE_ITEAM;
        user.find({quyen:1}).skip(skip).limit(PAGE_ITEAM)
            .then(function (data) {
                user.countDocuments({})
                    .then(function (count) {
                        data.forEach(user => {
                            a.push(user.toObject());
                        });
                        res.json({
                            total: count,
                            data: a
                        })
                    })
            })
    }
    get_total_page_profile(req, res, next) {
        let a = [];
        const PAGE_ITEAM = 10;
        let page = req.query.page;
        if (!parseInt(page) || parseInt(page) < 1 || !page) {
            page = '1';
        }
        page = parseInt(page);
        let skip = (page - 1) * PAGE_ITEAM;
        profile.find({}).skip(skip).limit(PAGE_ITEAM)
            .then(function (data) {
                profile.countDocuments({})
                    .then(function (count) {
                        data.forEach(profile => {
                            a.push(profile.toObject());
                        });
                        res.json({
                            total: count,
                            data: a
                        })
                    })
            })

    }


    async get_home(req, res, next) {
        let tong_profile_true = await profile.countDocuments({
            check: true,
        });
        let tong_profile_false = await profile.countDocuments({
            check: false,
        });
        let profile_tranning_day = await data_tranning.countDocuments({
            check: true,
            ngaytao: new Date().toDateString(),
        });
        let profile_crawling_day = await profile.countDocuments({
            check: true,
            ngaytao: new Date().toDateString(),
        });
        let profile_not_crawling_day = await profile.countDocuments({
            check: false,
            ngaytao: new Date().toDateString(),
        });
        let user_day = await user.countDocuments({
            ngaytao: new Date().toDateString(),
        })
        let total_user = await user.countDocuments({});
        /*  */
        let pt_tranning_day = (profile_tranning_day * 100) / tong_profile_true;
        let pt_crawling_day = (profile_crawling_day * 100) / tong_profile_true;
        let pt_not_handled_day = (profile_not_crawling_day * 100) / tong_profile_false;
        let pt_userday = (user_day * 100) / (total_user - user_day);
        console.log("ngày",new Date().toDateString())
        res.render('admin-view/admin_home', {
            total_profile_tranning_day: profile_tranning_day,
            total_profile_crawling_day: profile_crawling_day,
            not_handled_day: profile_not_crawling_day,
            user_day: user_day,
            /*  */
            pt_tranning: pt_tranning_day.toFixed(1),
            pt_crawling: pt_crawling_day.toFixed(1),
            pt_not_handled: pt_not_handled_day.toFixed(1),
            pt_userday: pt_userday.toFixed(1),
        });

    }

    async post_admin_home(req, res, next) {
        let tong_profile = await profile.countDocuments({});
        let tong_profile_true = await profile.countDocuments({
            check: true,
        })
        let tong_tranning = await data_tranning.countDocuments({});
        let data = {
            tong_profile: tong_profile,
            tong_profile_true: tong_profile_true,
            tong_tranning: tong_tranning
        }
        return res.status(200).json(data);
    }

    get_all_profile(req, res, next) {
        let a = [];
        const PAGE_ITEAM = 10;
        let page = req.query.page;
        if (!parseInt(page) || parseInt(page) < 1 || !page) {
            page = '1';
        }
        page = parseInt(page);
        let skip = (page - 1) * PAGE_ITEAM;
        profile.find({}).skip(skip).limit(PAGE_ITEAM)
            .then(function (data) {
                data.forEach(profile => {
                    a.push(profile.toObject());
                });
                res.render('admin-view/admin_all-profile', {
                    data: a
                })
            })
    }
    delete_profile(req, res, next) {
        profile.deleteOne({ profile_id: req.body.profile_id })
            .then(function (data) {
                res.status(200).json(data);
            })
    }
    get_all_user(req, res, next) {
        user.find({quyen:1}).limit(5)
            .then(function (data) {
                let a = [];
                data.forEach(user => {
                    a.push(user.toObject());
                });
                return res.render('admin-view/admin_all-user', {
                    data: a
                })
            })
    }
    delete_user(req, res, next) {
        user.deleteOne({ username: req.body.username })
            .then(function (data) {
                res.status(200).json(data);
            })
    }

    async get_feedback(req, res, next) {

        Promise.all([feedback.find({ status: false }), feedback.find({ status: true })])
            .then(function (data) {
                let chuaxuly = [];
                data[0].forEach(function (data) {
                    chuaxuly.push(data.toObject())
                })
                let daxuly = [];
                data[1].forEach(function (data) {
                    daxuly.push(data.toObject())
                })
                res.render('admin-view/feedback', {
                    daxuly: daxuly,
                    chuaxuly: chuaxuly
                })
            })

    }

    delete_feedback(req, res, next) {
        feedback.deleteOne({
            _id: new Object(req.body._id)
        }).then(function (data) {
            res.status(200).json(data);
        })
            .catch(function (err) {
                res.status(401).json(err);
            })
    }
    update_status_feedback(req, res, next) {
        feedback.updateOne({
            _id: new Object(req.body._id)
        }, {
            status: !JSON.parse(req.body.status),
        })
            .then(function (data) {
                res.status(200).json(data);
            })
    }

    /*  */
    get_notification(req, res, next) {
        user.find({})
            .then(function (data) {
                if (data.length > 0) {
                    res.render('admin-view/notification', {
                        data: data[0].notifications
                    })
                }
            })
    }
    async add_notification(req, res, next) {
        let id = uuidv4();
        req.body.thoigian = new Date().toDateString()
        req.body.status = false;
        req.body.id = id;
        user.find({})
            .then(async function (list_user) {
                if (list_user.length > 0) {
                    let kt;
                    for (let i = 0; i < list_user.length; i++) {
                        list_user[i].notifications.unshift(req.body)
                        kt = await user.updateOne({
                            _id: list_user[i]._id,
                            username: list_user[i].username
                        }, {
                            notifications: list_user[i].notifications,
                        })
                    }
                    if (kt.modifiedCount > 0) {
                        return res.status(200).json(req.body)
                    }
                    else {
                        const error = new Error('Không Sửa Được Thông Báo');
                        error.status = 401;
                        return next(error);
                    }
                }
            })
            .catch(function (err) {
                res.status(401).json(err)
            })

    }

    delete_notification(req, res, next) {

        user.find({})
            .then(function (list_user) {
                for (let i = 0; i < list_user.length; i++) {
                    let list_notifications_moi = [];
                    for (let j = 0; j < list_user[i].notifications.length; j++) {
                        if (list_user[i].notifications[j].id != req.body.id) {
                            list_notifications_moi.push(list_user[i].notifications[j])
                        }
                    }
                    user.updateOne(list_user[i], {
                        notifications: list_notifications_moi
                    }).catch(function (err) {
                        return next(err)
                    })
                }
                return res.status(200).json(req.body)
            })
            .catch(function (err) {
                res.status(401).json(err)
            })
    }
}

module.exports = new adminController;