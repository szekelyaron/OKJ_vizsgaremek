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

router.get('/sugo', mainController.getSugo);

router.get('/kapcsolat', mainController.getContactus);

router.post('/contactuskuld', mainController.postContactus);

// Fooldal

router.get('/fooldal', mainController.getFooldal);

router.post('/fooldal',mainController.rendszamlekerdezes);

router.post('/fooldal',mainController.checkLogin);

router.post('/kijelentkezes', mainController.postLogout);

router.get('/vendeg',mainController.getVendeg);

router.post('/vendeg',mainController.rendszamlekerdezesVendeg);

router.get('/termekek',mainController.gumikLekerdezes);

router.get('/kosar',mainController.getKosar);

router.post('/kosarhozad',mainController.gumiKosarba);

router.post('/kosarhozadSzett',mainController.gumiKosarbaSzett);

router.post('/kosarMinusz', mainController.gumiKosartorol);

router.post('/kosarPlusz', mainController.gumiKosarPlusz);

router.post('/elkuld',mainController.postRendeles);

router.get('/kalkulator', mainController.getKalkulator);

router.post('/kalkulator', mainController.postKalkulator);

router.post('/torol', mainController.gumiKosartorolTeljes);

module.exports = router;