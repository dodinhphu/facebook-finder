const { Router } = require('express');
const express = require('express');
const routes = express.Router();
const verifyToken = require('../middleware/verifyToken');
const check_quyen = require('../middleware/check_permissions');
const adminController = require('../controllers/adminController');
routes.get('/',verifyToken,check_quyen,adminController.get_home);
routes.get('/notification',verifyToken,check_quyen,adminController.get_notification);
routes.put('/notification',verifyToken,check_quyen,adminController.delete_notification);
routes.post('/notification',verifyToken,check_quyen,adminController.add_notification);
routes.get('/feedback',verifyToken,check_quyen,adminController.get_feedback);
routes.post('/feedback',verifyToken,check_quyen,adminController.update_status_feedback);
routes.delete('/feedback',verifyToken,check_quyen,adminController.delete_feedback);
routes.get('/all_profile',verifyToken,check_quyen,adminController.get_all_profile)
routes.delete('/delete_profile',verifyToken,check_quyen,adminController.delete_profile)
routes.get('/all_user',verifyToken,check_quyen,adminController.get_all_user)
routes.delete('/delete_user',verifyToken,check_quyen,adminController.delete_user)
routes.get('/total_page_profile',verifyToken,check_quyen,adminController.get_total_page_profile)
routes.get('/total_page_user',verifyToken,check_quyen,adminController.get_total_page_user)
routes.post('/api/home',verifyToken,check_quyen,adminController.post_admin_home);
module.exports = routes;