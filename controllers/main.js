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
        path: '/bejelentkezes',
        error: '',
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
    if(req.session.user != null)
    {
        res.render('fooldal', {
            pageTitle: 'CarScope - Főoldal',
            path: '/fooldal',
            //errorCode: '',
        });
    }
    else
    {
        res.redirect('/vendeg');
    }
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
        res.redirect('/fooldal');
    }
    else
    {
        next();
    }
};



exports.checkLogin = (req, res, next) => {
    if(req.session.user != null)
    {
        res.redirect('/fooldal');
    }
    else
    {
        res.redirect('/vendeg');
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
        res.redirect('/fooldal');
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
        res.redirect('/fooldal');
    } 
    else{
    login.loginUser(req, res, function(err, data) {
        if (err) {
            res.render('bejelentkezes', {
                pageTitle: 'CarScope - Bejelentkezés',
                path: '/bejelentkezes',
                error: 'Hibás emailcím vagy jelszó',
                user: req.session.user,
            });
        } else {
            res.redirect('/fooldal');
        }
      });
    }
};

const register = require('../models/users/register.js');
const { body, validationResult } = require('express-validator');
const logout = require('../models/users/logout.js');
const res = require('express/lib/response');

exports.postLogout = (req,res,next) => {
    logout.logoutUser(req, res, function(err, data) {
      if (err) {
        console.log({ 'error': data.error, 'message': data.message });
      } else {
        console.log({ 'success': data.success, 'message': data.message });
        res.redirect('/');
      }
    });
};

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
