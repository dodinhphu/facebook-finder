const { Router } = require('express');
const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController')
const kt_dangNhap = require('../middleware/check_login')
const verifyToken = require('../middleware/verifyToken')
routes.get('/register',kt_dangNhap,authController.get_register);
routes.post('/register',authController.post_register);
routes.get('/login',kt_dangNhap,authController.get_login);
routes.post('/login',authController.Post_login);
routes.post('/logout',verifyToken,authController.Post_logout);
routes.get('/changepassword',verifyToken,authController.get_doi_mk);
routes.post('/changepassword',verifyToken,authController.update_mk);

/*  */
routes.get('/forgotpassword',authController.get_forgotpassword);
routes.post('/forgotpassword',authController.post_forgotpassword);
routes.post('/changeforgotpassword',authController.post_changeforgotpassword);
module.exports = routes;