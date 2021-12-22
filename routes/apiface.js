const express = require('express');
const routes = express.Router();
const faceapiController = require('../controllers/faceapiController')
 
routes.get('/',faceapiController.show);

module.exports = routes;