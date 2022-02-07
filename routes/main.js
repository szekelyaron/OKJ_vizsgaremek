const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const mainController = require('../controllers/main');

var session = require('express-session');
const validationForm = require('../models/users/validate');

const router = express.Router();
router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

router.get('/', mainController.getIndex);

router.get('/', mainController.checkLogin);

router.get('/bejelentkezes', mainController.getBejelentkezes);

router.post('/bejelentkezes', mainController.postLogin);

router.get('/bejelentkezes', mainController.checkLogin);

router.get('/regisztracio', mainController.getRegisztracio);

router.post('/regisztracio', validationForm.form ,mainController.validateRegistration);

router.get('/fooldal', mainController.getFooldal);

router.post('/fooldal',mainController.rendszamlekerdezes);

router.get('/sugo', mainController.getSugo);

router.get('/contactus', mainController.getContactus);

router.post('/kijelentkezes', mainController.postLogout);

router.post('/fooldal',mainController.checkLogin);

router.get('/vendeg',mainController.getVendeg);

router.post('/vendeg',mainController.rendszamlekerdezesVendeg);

router.get('/termekek',mainController.gumikLekerdezes);

router.get('/kosar',mainController.getKosar);

router.post('/kosarhozad',mainController.gumiKosarba);

router.post('/kosartorol', mainController.gumiKosartorol);

module.exports = router;