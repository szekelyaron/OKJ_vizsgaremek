const register = require("../../models/users/register.js");
const lekerdGumik = require("../../models/users/gumi.js");
const login = require("../../models/users/login.js");
const req = require("express/lib/request");

test("login-jo", () => {
    var req = [];
    req.body = [];
    req.body.email = "proba@proba.com";
    req.body.jelszo = "Proba1122";
    req.session = [];
    var res = [];
    var rows = [];
    login.loginUser(req, res, function(err, data) {
        expect(err).toBe(true)
    })
    req.session.user = null;
});

 test("login-rossz", () => {
    var req = [];
    req.body = [];
    req.body.email = "proba2@proba.com";
    req.body.jelszo = "Proba11222";
    req.session = [];
    var res = [];
    login.loginUser(req, res, function(err, data) {
        expect(err).toBe(true)
    })
});

test("register-jo", () => {
     var req = [];
     req.body = [];
     req.body.felhasznalonev = "test5vagyok";
     req.body.email = "test@test5.com";
     req.body.jelszo = "Proba11222";
     req.body.password_again = "Proba11222";
     req.session = [];
     var res = [];
     var res = function(){};
     res.render = function(){};
     register.registerUser(req, res, function(err, data) {
         expect(err).toBe(true)
     })
 });
