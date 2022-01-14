var mysql =	require("../db.js"),
	mysqlPool = mysql.createPool();
const crypto = require("crypto");
var lekerd = function(){};

lekerd.prototype.lekerdRendszam = function(req, res, callback){
    rendszam = req.body.rendszam,
    params = [rendszam],
    lekerdquery = 'SELECT auto.Gyarto, auto.Tipus, info.Evjarat, info.Allapot, info.Futottkm, info.VezetettSzervK, auto.Megbizhatosag, auto.Tipshiba, info.Okmanyok, info.Muszakierv, info.Alvazszam, info.Gumiabroncs FROM info INNER JOIN auto ON info.Auto_AID = auto.AID INNER JOIN gumiabroncs ON gumiabroncs.Info_ID = info.IID WHERE info.Rendszam = ?';
    mysqlPool.getConnection(function(err, connection){
		connection.query(lekerdquery, params, function(err, rows, fields){
            if(rows.length <= 0){
                connection.release();
                console.log(rendszam)
                console.log("Nincs ilyen rendszámú")
            }else{
                req.session.auto = rows[0];
                console.log(req.session.auto)
                connection.release();
                callback(null,rows[0]);
            }
        });
    });
}

module.exports = new lekerd();