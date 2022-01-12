var mysql =	require("../db.js"),
	mysqlPool = mysql.createPool();
const crypto = require("crypto");
var login = function(){};



login.prototype.loginUser = function(req, res, callback){
    var nowDate = new Date().toISOString().slice(0, 19).replace('T', ' '),
    secret = "!%/=._"+req.body.jelszo+"!%/._";
    jelszo = req.body.jelszo;
    md5Hasher = crypto.createHmac("md5", secret);
    jelszo = md5Hasher.update(jelszo).digest("hex");
    console.log(jelszo)
        params = [req.body.email, jelszo,0],
        detailParams = [],
        updateParams = [],
	    loginUserQuery = 'SELECT * FROM felhasznalo WHERE Email = ? AND Jelszó = ?',
        getDetailQuery = 'SELECT FID, Felhasználónév, Email, Jelszó FROM felhasznalo WHERE FID = ?';
	mysqlPool.getConnection(function(err, connection){
		connection.query(loginUserQuery, params, function(err, rows, fields) {
           if(rows.length <= 0){
                connection.release();
                callback(true, null);
                console.log("Hiba a bejelentkezesben")
            }else{
                detailParams = [rows[0].id];
                req.session.user = rows[0];
                connection.query(getDetailQuery, detailParams, function(err, rows, fields) {
                        connection.release();
                        callback(null, rows[0]);
                });
            }
		});
	});
}

module.exports = new login();