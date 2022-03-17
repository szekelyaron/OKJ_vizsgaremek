const register = require("../models/users/register.js");
const { body, validationResult } = require("express-validator");
const logout = require("../models/users/logout.js");
const res = require("express/lib/response");
const lekerdR = require("../models/users/auto.js");
const lekerdA = require("../models/users/auto.js");
const lekerdGumik = require("../models/users/gumi.js");
const login = require("../models/users/login.js");
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "carscope.site@gmail.com",
    pass: "Carscope2022",
  },
});

//Kezsőoldal
exports.getIndex = (req, res, next) => {
  res.render("kezdolap", {
    pageTitle: "CarScope",
    path: "/",
    user: req.session.user,
  });
};

//Vendég oldal
exports.getVendeg = (req, res, next) => {
  res.render("vendeg", {
    pageTitle: "CarScope - Vendég",
    path: "/vendeg",
    VendegKerdezettER: false,
    rendszam: req.session.rendszam,
    lekerderedm_vendeg: undefined,
    user: req.session.user,
  });
};

//Regisztrációs felület
exports.getRegisztracio = (req, res, next) => {
  if (req.session.user != null) {
    res.redirect("/fooldal");
  } else {
    res.render("regisztracio", {
      pageTitle: "CarScope - Regisztráció",
      path: "/regisztracio",
      errorCode: "",
      user: req.session.user,
    });
  }
};

//Regisztráció validálás
exports.validateRegistration = (req, res, next) => {
  let msg = [];
  const error = validationResult(req);
  const errorList = error.array();
  errorList.forEach((element) => {
    msg.push({ param: element.param, msg: element.msg });
  });
  if (!error.isEmpty()) {
    res.render("regisztracio", {
      pageTitle: "CarScope - Regisztráció",
      path: "/registration",
      errorCode: msg,
      user: req.session.user,
    });
  } else {
    register.registerUser(req, res, function (err, data) {
      if (err) {
        res.json({ error: true });
      } else {
        res.redirect("/");
      }
    });
  }
};

//Bejelentkező felület
exports.getBejelentkezes = (req, res, next) => {
  res.render("bejelentkezes", {
    pageTitle: "CarScope - Bejelentkezés",
    path: "/bejelentkezes",
    error: "",
    user: req.session.user,
  });
};

//Bejelentkezés
exports.postLogin = (req, res, next) => {
  if (req.session.user != null) {
    res.redirect("/fooldal");
  } else {
    login.loginUser(req, res, function (err, data) {
      if (err) {
        res.render("bejelentkezes", {
          pageTitle: "CarScope - Bejelentkezés",
          path: "/bejelentkezes",
          error: "Hibás emailcím vagy jelszó",
          user: req.session.user,
        });
      } else {
        res.redirect("/fooldal");
      }
    });
  }
};

//Kijelentkezés
exports.postLogout = (req, res, next) => {
  logout.logoutUser(req, res, function (err, data) {
    if (err) {
      console.log({ error: data.error, message: data.message });
    } else {
      console.log({ success: data.success, message: data.message });
      res.redirect("/");
    }
  });
};

//Be van-e jelentkezve
exports.checkLogin = (req, res, next) => {
  if (req.session.user != null) {
    res.redirect("/fooldal");
  } else {
    res.redirect("/vendeg");
  }
};

//Főoldal
exports.getFooldal = (req, res, next) => {
  if (req.session.user != null) {
    res.render("fooldal", {
      pageTitle: "CarScope - Főoldal",
      path: "/fooldal",
      user: req.session.user,
      rendszam: req.session.rendszam,
      alvazszam: req.session.alvazszam,
      lekerderedm_rendsz: undefined,
      lekerderedm_alvaz: undefined,
      kerdezettEA: false,
      kerdezettER: false,
    });
  } else {
    res.redirect("/vendeg");
  }
};

// Rendszámlekérdezés - Vendég
exports.rendszamlekerdezesVendeg = (req, res, next) => {
  lekerdR.rendszamalapjan(req, res, function (err, data) {
    if (err || req.session.auto_adatai_rendsz == undefined) {
      res.render("vendeg", {
        pageTitle: "CarScope - Vendég",
        path: "/vendeg",
        VendegKerdezettER: true,
        lekerderedm_vendeg: req.session.auto_adatai_rendsz,
      });
    } else {
      res.render("vendeg", {
        pageTitle: "CarScope - Vendég",
        path: "/vendeg",
        lekerderedm_vendeg: req.session.auto_adatai_rendsz,
        VendegKerdezettER: true,
      });
    }
  });
};

// Rendszám és alvázszám lekérdezés
exports.rendszamlekerdezes = (req, res, next) => {
  if (req.body.R == "True") {
    lekerdR.rendszamalapjan(req, res, function (err, data) {
      if (err || req.session.auto_adatai_rendsz == undefined) {
        console.log("Nem jó");
        res.render("fooldal", {
          pageTitle: "CarScope - Főoldal",
          path: "/fooldal",
          kerdezettER: true,
          kerdezettEA: false,
          lekerderedm_rendsz: req.session.auto_adatai_rendsz,
          lekerderedm_alvaz: req.session.auto_adatai_alvaz,
        });
      } else {
        res.render("fooldal", {
          pageTitle: "CarScope - Főoldal",
          path: "/fooldal",
          lekerderedm_rendsz: req.session.auto_adatai_rendsz,
          lekerderedm_alvaz: req.session.auto_adatai_alvaz,
          kerdezettER: true,
          kerdezettEA: false,
        });
      }
    });
  }
  if (req.body.A == "True") {
    lekerdA.alvazszamalapjan(req, res, function (err, data) {
      if (err || req.session.auto_adatai_alvaz == undefined) {
        console.log("nemjó");
        res.render("fooldal", {
          pageTitle: "CarScope - Főoldal",
          path: "/fooldal",
          kerdezettEA: true,
          kerdezettER: false,
          lekerderedm_alvaz: req.session.auto_adatai_alvaz,
          lekerderedm_rendsz: req.session.auto_adatai_rendsz,
        });
      } else {
        res.render("fooldal", {
          pageTitle: "CarScope - Főoldal",
          path: "/fooldal",
          lekerderedm_alvaz: req.session.auto_adatai_alvaz,
          lekerderedm_rendsz: req.session.auto_adatai_rendsz,
          kerdezettEA: true,
          kerdezettER: false,
        });
      }
    });
  }
};

//Gumik kilistázása
exports.gumikLekerdezes = (req, res, next) => {
  lekerdGumik.gumikKilistaz(req, res, function (err, data) {
    if (req.session.user != null) {
      res.render("termekek", {
        pageTitle: "CarScope - Termékek",
        path: "/termekek",
        user: req.session.user,
        lekerderedm_gumik: req.session.gumiabroncs,
        kosarTartalma: req.session.kosarTartalma,
      });
    } else {
      res.redirect("/vendeg");
    }
  });
};

//Gumik kosárba helyezése/törlése
exports.gumiKosarba = (req, res, next) => {
  function kosarhozad() {
    termek = req.body.termek_id;
    if (req.session.user.kosar == undefined) {
      req.session.user.kosar = [];
      var kosar = { termek_id: termek, qty: 1 };
      req.session.user.kosar.push(kosar);
    } else {
      var contains = false;
      for (let termek of req.session.user.kosar) {
        if (termek.termek_id == req.body.termek_id) {
          termek.qty += 1;
          var contains = true;
        }
      }
      if (contains == false) {
        req.session.user.kosar.push({ termek_id: termek, qty: 1 });
      }
    }
    res.redirect("/termekek");
  }
  setTimeout(kosarhozad, 950);
};

exports.gumiKosartorolTeljes = (req, res, next) => {
  var termek = req.body.termek_id;
  var kosar = req.session.user.kosar;
  var index = kosar.findIndex((g) => g.termek_id == termek);
  kosar.splice(index, 1);
  res.redirect("/kosar");
};

exports.gumiKosarbaSzett = (req, res, next) => {
  function kosarhozad() {
    termek = req.body.termek_id;
    if (req.session.user.kosar == undefined) {
      req.session.user.kosar = [];
      var kosar = { termek_id: termek, qty: 4 };
      req.session.user.kosar.push(kosar);
    } else {
      var contains = false;
      for (let termek of req.session.user.kosar) {
        if (termek.termek_id == req.body.termek_id) {
          termek.qty += 4;
          var contains = true;
        }
      }
      if (contains == false) {
        req.session.user.kosar.push({ termek_id: termek, qty: 4 });
      }
    }
    res.redirect("/termekek");
  }
  setTimeout(kosarhozad, 950);
};

exports.gumiKosartorol = (req, res, next) => {
  //console.log("Lefutott -");
  var termek = req.body.termek_id;
  var termektemp = [];
  var zero = false;
  var kosar = req.session.user.kosar;
  for (let termek of req.session.user.kosar) {
    if (termek.termek_id == req.body.termek_id) {
      console.log(termek.termek_id);
      console.log(req.body.termek_id);
      termek.qty -= 1;
      if (termek.qty <= 0) {
        zero = true;
      }
    }
  }
  if (zero == true) {
    for (let termek of req.session.user.kosar) {
      if (termek.qty > 0) {
        termektemp.push(termek);
      }
    }
    req.session.user.kosar = termektemp;
  }
  console.log(req.session.user.kosar);
  if (req.session.user.kosar == "") {
    req.session.user.kosar = undefined;
  }
  res.redirect("/kosar");
};

exports.gumiKosarPlusz = (req, res, next) => {
  console.log("Lefutott +");

  for (let termek of req.session.user.kosar) {
    if (termek.termek_id == req.body.termek_id) {
      termek.qty += 1;
    }
  }
  res.redirect("/kosar");
};

//Kosár betöltése
exports.getKosar = (req, res, next) => {
  lekerdGumik.gumikKilistaz(req, res, function (err, data) {
    if (req.session.user != null && req.session.user != "") {
      if (req.session.user.kosar != undefined) {
        req.session.user.kosarOsszeg = 0;
        for (let termek of req.session.user.kosar) {
          for (let gumi of req.session.gumiabroncs) {
            if (termek.termek_id == gumi.GID) {
              req.session.user.kosarOsszeg += termek.qty * gumi.Ar;
              console.log(req.session.user.kosarOsszeg);
            }
          }
        }
      }
      res.render("kosar", {
        pageTitle: "CarScope - Kosár",
        path: "/kosar",
        lekerderedm_gumik: req.session.gumiabroncs,
        kosarTartalma: req.session.user.kosar,
        kosarOsszeg: req.session.user.kosarOsszeg,
        user: req.session.user,
        username: req.body.felhasznalonev,
        email: req.body.email,
        siker: undefined
      });
    } else {
      res.redirect("/vendeg");
    }
  });
};
//Rendelés elküldése
exports.postRendeles = (req, res, next) => {
  var iranyitoszam = req.body.irsz;
  var telefonszam = req.body.tel;
  var varos = req.body.varos;
  var utca = req.body.utca;
  var hsz = req.body.hsz;
  if (req.session.user.kosar != undefined) {
    req.session.user.kosarOsszeg = 0;
    for (let termek of req.session.user.kosar) {
      for (let gumi of req.session.gumiabroncs) {
        if (termek.termek_id == gumi.GID) {

          req.session.user.kosarOsszeg += termek.qty * gumi.Ar;
          console.log(req.session.user.kosarOsszeg);
        }
      }
    }
  }
  var message = '<div>'
    for (let termek of req.session.user.kosar) {
      for (let gumi of req.session.gumiabroncs) {
        if(termek.termek_id == gumi.GID)
        {
        message += '<div><p> Rendelés adatai:'+gumi.Evszak +', '+gumi.Gyarto+', Ár/db: '+gumi.Ar+' Rendelt mennyiség: '+ termek.qty+' Ára:'+gumi.Ar*termek.qty+'+</p></div>';
        }
      }
    }
    message += '<div><p> Teljes ár: '+req.session.user.kosarOsszeg +'</p></div></div>';
    message += 'Telefonszám: '+telefonszam+" Cím: "+iranyitoszam+' '+varos+' '+utca+' '+hsz;
  console.log(message);
  var emails = "carscope.site@gmail.com,"+req.body.email;
  console.log(emails);
  var mailOptions = {
    to: emails,
    subject: "Rendelés-email",
    html: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.render("kosar", {
        pageTitle: "CarScope - Kosár",
        path: "/kosar",
        lekerderedm_gumik: req.session.gumiabroncs,
        kosarTartalma: req.session.user.kosar,
        kosarOsszeg: req.session.user.kosarOsszeg,
        user: req.session.user,
        username: req.body.felhasznalonev,
        email: req.body.email,
        siker: false
      });
    } else {
      console.log("Email elküldve: " + info.response);
      res.render("kosar", {
        pageTitle: "CarScope - Kosár",
        path: "/kosar",
        lekerderedm_gumik: req.session.gumiabroncs,
        kosarTartalma: req.session.user.kosar,
        kosarOsszeg: req.session.user.kosarOsszeg,
        user: req.session.user,
        username: req.body.felhasznalonev,
        email: req.body.email,
        siker: true,
      });
    }
  });
  req.session.user.kosar = [];
};

//Sugo
exports.getSugo = (req, res, next) => {
  res.render("sugo", {
    pageTitle: "CarScope - Súgó",
    path: "/sugo",
    user: req.session.user,
  });
};

//Kapcsolat
exports.getContactus = (req, res, next) => {
  res.render("contactus", {
    pageTitle: "CarScope - Contactus",
    path: "/kapcsolat",
    user: req.session.user,
    siker: false,
  });
};

exports.postContactus = (req, res, next) => {
  var mailOptions = {
    to: "carscope.site@gmail.com",
    subject: "Contatus-email",
    text: req.body.uzenet + " Feladó: " + req.body.name + " " + req.body.email,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.render("contactus", {
        pageTitle: "CarScope - Contactus",
        path: "/contactus",
        user: req.session.user,
        siker: false,
      });
    } else {
      console.log("Email elküldve: " + info.response);
      res.render("contactus", {
        pageTitle: "CarScope - Contactus",
        path: "/contactus",
        user: req.session.user,
        siker: true,
      });
    }
  });
};

//Kerék magasság kalkulátor
exports.getKalkulator = (req, res, next) => {
  if (req.session.user != null) {
    res.render("kalkulator", {
      pageTitle: "CarScope - Kalkulátor",
      path: "/kalkulator",
      Eredmeny: undefined,
      Kerdezett: false,
      user: req.session.user,
    });
  } else {
    res.redirect("/vendeg");
  }
};
exports.postKalkulator = (req, res, next) => {
  var szelesseg = req.body.szelesseg;
  var oldalfal = req.body.oldalfal;
  var atmer = req.body.magassag;
  var teljesAtmero;

  teljesAtmero = 2.54 * atmer + (2 * (szelesseg * (oldalfal / 100))) / 10;
  res.render("kalkulator", {
    pageTitle: "CarScope - Kalkulátor",
    path: "/kalkulator",
    Eredmeny: teljesAtmero,
    Kerdezett: true,
    user: req.session.user,
  });
};
