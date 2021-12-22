const express = require('express');
const routes = express.Router();
const nontificationController = require('../controllers/nontificationController');
const verifyToken = require('../middleware/verifyToken');

routes.get('/', verifyToken, nontificationController.get_show);

module.exports = routes;