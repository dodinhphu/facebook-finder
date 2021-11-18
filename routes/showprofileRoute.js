const express = require('express');
const routes = express.Router();
const verifyToken = require('../middleware/verifyToken')
const showProfileController = require('../controllers/showProfileController')
routes.get('/:id_profile', verifyToken, showProfileController.getshow_details);
routes.get('/', showProfileController.getshow);
module.exports = routes;