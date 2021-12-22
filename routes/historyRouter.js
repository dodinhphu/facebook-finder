const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const routes = express.Router();
const historyController = require('../controllers/historyController')
 
routes.get('/',verifyToken,historyController.get_show);
routes.get('/total',verifyToken,historyController.get_total_page_history);
module.exports = routes;