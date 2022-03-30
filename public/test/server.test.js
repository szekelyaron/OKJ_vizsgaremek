const lekerdR = require("../../models/users/auto.js");
const lekerdA = require("../../models/users/auto.js");
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
    login.loginUser(req, res, function(err, data) {
        expect(err).toBe(null)
    })
    req.session.user = null;
});

test("Rlogin-rossz", () => {
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

register.registerUser(req, res, function(err, data) {
    expect(err)
})