const register = require('../models/users/register.js');
const { body, validationResult } = require('express-validator');
const logout = require('../models/users/logout.js');
const res = require('express/lib/response');
const lekerdR = require('../models/users/auto.js');
const lekerdA = require('../models/users/auto.js');
const lekerdGumik = require('../models/users/gumi.js');
const login = require('../models/users/login.js');

//Kezsőoldal
exports.getIndex = (req, res, next) => {
    res.render('kezdolap', {
        pageTitle: 'CarScope',
        path: '/',
        user: req.session.user,
    });
};

//Vendég oldal
exports.getVendeg = (req, res, next) => {
    res.render('vendeg', {
        pageTitle: 'CarScope - Vendég',
        path: '/vendeg',
        VendegKerdezettER: false,
        rendszam: req.session.rendszam,
        lekerderedm_vendeg: undefined
    });
};

//Regisztrációs felület
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

//Regisztráció validálás
exports.validateRegistration = (req,res,next) => {
        let msg = []
        const error = validationResult(req);
        const errorList = error.array();
        errorList.forEach(element => {
            msg.push({param: element.param, msg: element.msg})
        });
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

//Bejelentkező felület
exports.getBejelentkezes = (req, res, next) => {
    res.render('bejelentkezes', {
        pageTitle: 'CarScope - Bejelentkezés',
        path: '/bejelentkezes',
        error: '',
    });
};

//Bejelentkezés
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

//Kijelentkezés
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

//Be van-e jelentkezve
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

//Főoldal
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
            kerdezettEA: false,
            kerdezettER: false
        }); 
    }
    else
    {
        res.redirect('/vendeg');
    }
};

// Rendszámlekérdezés - Vendég
exports.rendszamlekerdezesVendeg = (req,res,next) => {
    lekerdR.rendszamalapjan(req, res, function(err, data) {
        if(err || req.session.auto_adatai_rendsz == undefined)
        {
            res.render('vendeg',{
                pageTitle: 'CarScope - Vendég',
                path: '/vendeg',
                VendegKerdezettER: true,
                lekerderedm_vendeg: req.session.auto_adatai_rendsz,
            })
            
        }
        else {
            res.render('vendeg',{
                pageTitle: 'CarScope - Vendég',
                path: '/vendeg',
                lekerderedm_vendeg: req.session.auto_adatai_rendsz,
                VendegKerdezettER: true
            })
        }
    })
};

// Rendszám és alvázszám lekérdezés
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
                    kerdezettER: true,
                    kerdezettEA: false,
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
                    kerdezettER: true,
                    kerdezettEA: false
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
                    kerdezettEA: true,
                    kerdezettER: false,
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
                    kerdezettEA: true,
                    kerdezettER: false,
                })
            }
        })
    }
};

//Gumik kilistázása
exports.gumikLekerdezes = (req,res,next) => {
    lekerdGumik.gumikKilistaz(req, res, function(err, data) {
        if(req.session.user != null)
        {
            res.render('termekek', {
                pageTitle: 'CarScope - Termékek',
                path: '/termekek',
                lekerderedm_gumik: req.session.gumiabroncs,
                kosarTartalma: req.session.kosarTartalma
            })
        }
        else
        {
            res.redirect('/vendeg');
        }   
    })
};

//Gumik kosárba helyezése/törlése
exports.gumiKosarba = (req,res,next) => {
    function kosarhozad(){
    console.log("asd");
    termek = req.body.termek_id;
    if(req.session.user.kosar == undefined)
    {
        req.session.user.kosar = []
        var kosar = {termek_id: termek, qty: 1}
        req.session.user.kosar.push(kosar);
    }
    else
    {
        var contains = false;
        for(let termek of req.session.user.kosar)
        {
            if(termek.termek_id == req.body.termek_id)
            {
                termek.qty += 1;
                var contains = true;
            }
        }
        if(contains == false)
        {
            req.session.user.kosar.push({termek_id: termek, qty: 1})
        }
    }
    res.redirect('/termekek');
 }
 setTimeout(kosarhozad, 1000);
};

exports.gumiKosartorol = (req,res,next) => {
    console.log("Lefutott -");
    var termek = req.body.termek_id;
    var termektemp = [];
    var zero = false;
    var kosar = req.session.user.kosar;
    for(let termek of req.session.user.kosar)
    {
        if(termek.termek_id == req.body.termek_id)
        {
            console.log(termek.termek_id)
            console.log(req.body.termek_id)
            termek.qty -= 1;
            if(termek.qty <= 0)
            {
             zero = true;
            }
        }
    }
    if(zero == true)
    {
        for(let termek of req.session.user.kosar)
        {
            if(termek.qty  > 0)
            {
                termektemp.push(termek);
            }
        }
        req.session.user.kosar = termektemp;
    }
    res.redirect('/kosar');
};

exports.gumiKosarPlusz = (req, res, next) => {
    console.log("Lefutott +");

    for(let termek of req.session.user.kosar)
        {
            if(termek.termek_id == req.body.termek_id)
            {
                termek.qty += 1;
            }
        }
    res.redirect('/kosar');
}

//Kosár betöltése
exports.getKosar = (req, res, next) => {
    lekerdGumik.gumikKilistaz(req, res, function(err, data) {
        if(req.session.user != null)
        {
            res.render('kosar', {
                pageTitle: 'CarScope - Kosár',
                path: '/kosar',
                lekerderedm_gumik: req.session.gumiabroncs,
                kosarTartalma: req.session.user.kosar
            })
        }
        else
        {
            res.redirect('/vendeg');
        }   
    })
};

//Sugo
exports.getSugo = (req, res, next) => {
    res.render('sugo', {
        pageTitle: 'CarScope - Súgó',
        path: '/sugo',
    });
};

//Kapcsolat
exports.getContactus = (req, res, next) => {
    res.render('contactus', {
        pageTitle: 'CarScope - Contactus',
        path: '/contactus',
    });
};