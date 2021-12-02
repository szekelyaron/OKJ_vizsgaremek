const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const mainController = require('../controllers/main');

const router = express.Router();

router.get('/', mainController.getIndex);

router.get('/bejelentkezes', mainController.getBejelentkezes);

router.get('/regisztracio', mainController.getRegisztracio);

module.exports = router;