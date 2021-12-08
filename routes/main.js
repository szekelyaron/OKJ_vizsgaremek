const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const mainController = require('../controllers/main');

const router = express.Router();

router.get('/', mainController.getIndex);

router.get('/bejelentkezes', mainController.getBejelentkezes);

router.get('/regisztracio', mainController.getRegisztracio);

router.get('/fooldal', mainController.getFooldal);

router.get('/sugo', mainController.getSugo);

router.get('/contactus', mainController.getContactus);

module.exports = router;