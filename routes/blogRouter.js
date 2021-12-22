const express = require('express');
const routes = express.Router();
const blogController = require('../controllers/blogController')
 
routes.get('/',blogController.show);

module.exports = routes;