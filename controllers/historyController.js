const profile = require('../models/profiles');
const user = require('../models/user');
class historyController {
    async get_show(req, res, next) {
        let user_history = await user.findOne({
            username: req.data.username
        })
        let a = [];
        for (let i = 0; i < user_history.history.length; i++) {
            let tam = await profile.findOne({
                profile_id: user_history.history[i]
            })
            await a.push(tam.toObject())
        }
        let list_profile = [];
        for (let i = 0; i < 4; i++) {
            if (a[i]) {
                list_profile.push(a[i]);
            }
        }
        return res.render('history', {
            data: list_profile
        });
    }

    async get_total_page_history(req, res, next) {
        let user_history = await user.findOne({
            username: req.data.username
        })
        const PAGE_ITEAM = 4;
        let page = req.query.page;
        if (!parseInt(page) || parseInt(page) < 1 || !page) {
            page = '1';
        }
        page = parseInt(page);
        let skip = (page - 1) * PAGE_ITEAM;
        let a = [];
        for (let i = 0; i < user_history.history.length; i++) {
            let tam = await profile.findOne({
                profile_id: user_history.history[i]
            })
            await a.push(tam.toObject())
        }
        let list_profile = [];
        for (let i = skip; i < (skip + 4); i++) {
            if (a[i]) {
                list_profile.push(a[i]);
            }
        }
        res.json({
            total: a.length,
            data: list_profile
        })
    }
}
module.exports = new historyController();