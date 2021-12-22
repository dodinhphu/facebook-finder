const express = require('express');
const verifyToken = require('../middleware/verifyToken')
const routes = express.Router();
const contactController = require('../controllers/contactController')
 
routes.get('/',verifyToken,contactController.get_show);
routes.post('/',verifyToken,contactController.post_contact);
module.exports = routes;