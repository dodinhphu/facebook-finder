const express = require('express');
const routes = express.Router();
const verifyToken = require('../middleware/verifyToken')
const showProfileController = require('../controllers/showProfileController')
routes.get('/details/:id_profile', verifyToken, showProfileController.getshow_details);
routes.post('/list/', showProfileController.post_show_list);
routes.get('/list/', showProfileController.get_show_list);
routes.get('/', showProfileController.getshow);
module.exports = routes;