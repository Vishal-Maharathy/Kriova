const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user')

router.get('/', UserController.homeController);
router.get('/login', UserController.login);
router.post('/login', UserController.authenticate);
router.get('/signup', UserController.signup);
router.post('/signup', UserController.register);
router.get('/forgotPassword', UserController.forgotPassword);
router.post('/resetPassword', UserController.resetPassword);
router.get('/redirectUpdatePass/:token', UserController.renderResetPage);
router.post('/redirectUpdatePass/:token', UserController.updatePassword);

module.exports = router;