const register = require('../models/users/register.js');
const { body, validationResult } = require('express-validator');
const logout = require('../models/users/logout.js');
const res = require('express/lib/response');
const lekerdR = require('../models/users/auto.js');
const lekerdA = require('../models/users/auto.js');
const lekerdGumik = require('../models/users/gumi.js');


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


exports.getFooldal = (req, res, next) => {
    if(req.session.user != null)
    {
        res.render('fooldal', {
            pageTitle: 'CarScope - Főoldal',
            path: '/fooldal',
            rendszam: req.session.rendszam,
            alvazszam: req.session.alvazszam,
            lekerderedm_rendsz: undefined,
            lekerderedm_alvaz: undefined,
            kerdezettE: false
        }); 
    }
    else
    {
        res.redirect('/vendeg');
    }
};

exports.getVendeg = (req, res, next) => {
    res.render('vendeg', {
        pageTitle: 'CarScope - Vendég',
        path: '/vendeg',
    });
};

exports.gumikLekerdezes = (req,res,next) => {
    lekerdGumik.gumikKilistaz(req, res, function(err, data) {
        if(req.session.user != null)
        {
            res.render('termekek', {
                pageTitle: 'CarScope - Termékek',
                path: '/termekek',
                lekerderedm_gumik: req.session.gumiabroncs,
                
            })
        }
        else
        {
            res.redirect('/vendeg');
        }   
    })
}

exports.getKosar = (req, res, next) => {
    if(req.session.user != null)
    {
        res.render('kosar', {
            pageTitle: 'CarScope - Kosár',
            path: '/kosar',
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

exports.getRegisztracio = (req, res, next) => {
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

exports.rendszamlekerdezes = (req,res,next) => {
    if(req.body.R == "True")
    {
        lekerdR.rendszamalapjan(req, res, function(err, data) {
            if(err || req.session.auto_adatai_rendsz == undefined)
            {
                console.log("Nem jó");
                res.render('fooldal',{
                    pageTitle: 'CarScope - Főoldal',
                    path: '/fooldal',
                    kerdezettE: true,
                    lekerderedm_rendsz: req.session.auto_adatai_rendsz,
                    lekerderedm_alvaz: req.session.auto_adatai_alvaz
                })
                
            }
            else {
                res.render('fooldal',{
                    pageTitle: 'CarScope - Főoldal',
                    path: '/fooldal',
                    lekerderedm_rendsz: req.session.auto_adatai_rendsz,
                    lekerderedm_alvaz: req.session.auto_adatai_alvaz,
                    kerdezettE: true

                })
            }
        })
    }
    if(req.body.A == "True")
    {
        lekerdA.alvazszamalapjan(req, res, function(err, data) {
            if(err || req.session.auto_adatai_alvaz == undefined)
            {
                console.log("nemjó")
                res.render('fooldal',{
                    pageTitle: 'CarScope - Főoldal',
                    path: '/fooldal',
                    kerdezettE: true,
                    lekerderedm_alvaz: req.session.auto_adatai_alvaz,
                    lekerderedm_rendsz: req.session.auto_adatai_rendsz,
                })
            }
            else {
                res.render('fooldal',{
                    pageTitle: 'CarScope - Főoldal',
                    path: '/fooldal',
                    lekerderedm_alvaz: req.session.auto_adatai_alvaz,
                    lekerderedm_rendsz: req.session.auto_adatai_rendsz,
                    kerdezettE: true
                })
            }
        })
    }
};


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
