const { Router } = require('express');
const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController')
const kt_dangNhap = require('../middleware/kt_dangNhap')
const verifyToken = require('../middleware/verifyToken')
routes.get('/register',kt_dangNhap,authController.get_register);
routes.post('/register',authController.post_register);
routes.get('/login',kt_dangNhap,authController.get_login);
routes.post('/login',authController.Post_login);
routes.post('/logout',verifyToken,authController.Post_logout);

module.exports = routes;