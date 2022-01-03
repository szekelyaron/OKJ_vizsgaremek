exports.getIndex = (req, res, next) => {
    res.render('kezdolap', {
        pageTitle: 'CarScope',
        path: '/',
        user: req.session.user,
    });
};

exports.getBejelentkezes = (req, res, next) => {
    res.render('bejelentkezes', {
        pageTitle: 'CarScope - Bejelentkezés',
        path: '/bejelentkezes'
    });
};

exports.getRegisztracio = (req, res, next) => {
    res.render('regisztracio', {
        pageTitle: 'CarScope - Regisztáció',
        path: '/regisztracio',
        errorCode: '',
    });
};

exports.getFooldal = (req, res, next) => {
    res.render('fooldal', {
        pageTitle: 'CarScope - Főoldal',
        path: '/fooldal',
        //errorCode: '',
    });
};

exports.getSugo = (req, res, next) => {
    res.render('sugo', {
        pageTitle: 'CarScope - Súgó',
        path: '/sugo',
    });
};

exports.getContactus = (req, res, next) => {
    res.render('contactus', {
        pageTitle: 'CarScope - Contactus',
        path: '/contactus',
    });
};
//


exports.checkUserLogon = (req,res,next) => {
    if(req.session.user != null)
    {
        res.redirect('./dashboard/index');
    }
    else
    {
        next();
    }
};



exports.checkLogin = (req, res, next) => {
    if(req.session.user != null)
    {
        res.redirect('./dashboard/index');
    }
    else
    {
        next();
    }
};

exports.getLogin = (req, res, next) => {
    res.render('bejelentkezes', {
        pageTitle: 'CarScope - Bejelentkezés',
        path: '/bejelentkezes',
        user: req.session.user,
    });
};

exports.getRegistration = (req, res, next) => {
    if(req.session.user != null)
    {
        res.redirect('./dashboard/index');
    }
    else{
    res.render('regisztracio', {
        pageTitle: 'CarScope - Regisztráció',
        path: '/regisztracio',
        errorCode: '',
        user: req.session.user,
    });
}
};

const login = require('../models/users/login.js');

exports.postLogin = (req, res, next) => {
    if(req.session.user != null)
    {
        res.redirect('./dashboard/index');
    }
    else{
    login.loginUser(req, res, function(err, data) {
        if (err) {
          res.json({ 'error': true, 'message': 'Error logged in' });
        } else {
            res.redirect('./dashboard/index');
        }
      });
    }
};

const register = require('../models/users/register.js');
const { body, validationResult } = require('express-validator');


exports.validateRegistration = (req,res,next) => {
        let msg = []
        const error = validationResult(req);
        const errorList = error.array();
        errorList.forEach(element => {
            msg.push({param: element.param, msg: element.msg})
        });
        //console.log(errorList[0].value)
        if (!error.isEmpty()) {
            res.render('regisztracio',{
                pageTitle: 'CarScope - Regisztráció',
                path: '/registration',
                errorCode: msg,
                user: req.session.user,
            });
        }
        else{
        register.registerUser(req, res, function(err, data) {
            if (err) {
              res.json({ 'error': true });
            } else {
                res.redirect('/');
            }
          });
        }
};