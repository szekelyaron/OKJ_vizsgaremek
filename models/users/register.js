var mysql =	require("../db.js"),
	mysqlPool = mysql.createPool();
const crypto = require("crypto");
var register = function(){};

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
                //console.log(rows.length)
                for (let i = 0; i < rows.length; i++) {
                    if(JSON.parse(response)[i].email == params[1])
                    {
                        msg.push({param: "Email" ,msg: "Ez az email cím már foglalt!"});
                    }
                    if(JSON.parse(response)[i].username == params[0])
                    {
                        msg.push({param: "Felhasználónév",msg: "Ez a felhasználónév már foglalt!"});
                    }
                }   
                res.render('regisztracio',{
                    pageTitle: 'Regisztráció',
                    path: '/regisztracio',
                    errorCode: msg,
                })
                connection.release();
            }
            else{
                console.log
                connection.query(registerUserQuery, params, function(err, rows, fields) {
                    if(err){
                         console.log(err);
                         connection.release();
                     }else{
                         connection.release();
                         res.redirect('/')
                     }
                 });
            }
        })
	});    
};


module.exports = new register();