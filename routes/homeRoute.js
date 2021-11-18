const express = require('express');
const routes = express.Router();
const homeController = require('../controllers/homeController')
 
routes.get('/',homeController.show);

module.exports = routes;