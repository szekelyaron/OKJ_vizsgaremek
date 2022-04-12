var mysql =	require("../db.js"),
	mysqlPool = mysql.createPool();
const crypto = require("crypto");
const { runInNewContext } = require("vm");
var register = function(){};
var nodemailer = require('nodemailer');
const { getMaxListeners } = require("process");
const { callbackify } = require("util");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'carscope.site@gmail.com',
        pass: 'Carscope2022'
    }
});

register.prototype.registerUser = function(req, res, next) {
        secret = "!%/=._"+req.body.jelszo+"!%/._";
        jelszo = req.body.jelszo;
        md5Hasher = crypto.createHmac("md5", secret);
        jelszo = md5Hasher.update(jelszo).digest("hex");
        params = [req.body.felhasznalonev, req.body.email,jelszo, req.body.password_again,0],
        checkAvailabilityQuery = 'SELECT Felhasználónév, Email FROM felhasznalo WHERE Felhasználónév = ? OR Email = ?',
        registerUserQuery = 'INSERT INTO felhasznalo(Felhasználónév, Email, Jelszó) VALUES (?,?,?)',
        getDetailQuery = 'SELECT FID, Felhasználónév, Email, Jelszó FROM felhasznalo WHERE FID = ?';
	mysqlPool.getConnection(function(err, connection){
        connection.query(checkAvailabilityQuery, params, function(err,rows,fields)
        {
            if(rows.length > 0)
            {
                msg = [],
                response = JSON.stringify(rows);

                for (let i = 0; i < rows.length; i++) {
                    if(JSON.parse(response)[i].Email == params[1])
                    {
                        msg.push({param: "Email" ,msg: "Ez az email cím már foglalt!"});
                    }
                    if(JSON.parse(response)[i].Felhasználónév == params[0])
                    {
                        msg.push({param: "Felhasználónév",msg: "Ez a felhasználónév már foglalt!"});
                    }
                }
                connection.release();
                res.render('regisztracio',{
                    pageTitle: 'Regisztráció',
                    path: '/regisztracio',
                    errorCode: msg,
                })
                
            }
            else{
                connection.query(registerUserQuery, params, function(err, rows, fields) {
                    if(err){
                         console.log(err);
                         connection.release();
                     }else{
                         //console.log(req.body.email)
                        var mailOptions = {
                            to: req.body.email,
                            subject: 'SIKER! - CarScope',
                            text: 'Sikeresen regisztrál a CarScope oldalon!'
                        };
                        
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                                //console.log(error);
                            } else {
                                //console.log('Email sent: ' + info.response);
                                connection.release();
                                callback(null,null);
                                res.redirect('/bejelentkezes')
                            }
                        });
                     }
                 });
            }
        });
	});    
};


module.exports = new register();