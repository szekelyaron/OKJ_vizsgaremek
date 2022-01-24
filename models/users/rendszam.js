var mysql =	require("../db.js"),
	mysqlPool = mysql.createPool();
const crypto = require("crypto");
var lekerd = function(){};

lekerd.prototype.rendszamalapjan = function(req, res, callback){
    rendszam = req.body.rendszam,
    params = [rendszam],
    lekerdquery = 'SELECT auto.Gyarto, auto.Tipus, info.Evjarat, info.Allapot, info.Futottkm, info.VezetettSzervK, auto.Megbizhatosag, auto.Tipshiba, info.Okmanyok, info.Muszakierv, info.Alvazszam, info.Gumiabroncs FROM info INNER JOIN auto ON info.Auto_AID = auto.AID INNER JOIN gumiabroncs ON gumiabroncs.Info_ID = info.IID WHERE info.Rendszam = ?';
    mysqlPool.getConnection(function(err, connection){
		connection.query(lekerdquery, params, function(err, rows, fields){
            if(rows.length <= 0){
                connection.release();
                console.log(rendszam);
                console.log("Nincs ilyen rendszámú");
                req.session.auto_adatai_rendsz = undefined;
                callback(null,undefined);
            }else{
                req.session.auto_adatai_rendsz = rows[0];
                req.session.auto_adatai_alvaz = null;
                console.log(req.session.auto_adatai_rendsz)
                connection.release();
                callback(null,rows[0]);
            }
        });
    });
}

lekerd.prototype.alvazszamalapjan = function(req, res, callback){
    alvazszam = req.body.alvazszam,
    params2 = [alvazszam],
    lekerdquery = 'SELECT auto.Gyarto, auto.Tipus, info.Evjarat, info.Allapot, info.Futottkm, info.VezetettSzervK, auto.Megbizhatosag, auto.Tipshiba, info.Okmanyok, info.Muszakierv, info.Rendszam, info.Gumiabroncs FROM info INNER JOIN auto ON info.Auto_AID = auto.AID INNER JOIN gumiabroncs ON gumiabroncs.Info_ID = info.IID WHERE info.Alvazszam = ?';
    mysqlPool.getConnection(function(err, connection){
		connection.query(lekerdquery, params2, function(err, rows, fields){
            if(rows.length <= 0){
                connection.release();
                console.log(alvazszam);
                console.log("Nincs ilyen alvázszámú");
                req.session.auto_adatai_alvaz = undefined;
                callback(null,undefined);
            }else{
                req.session.auto_adatai_alvaz = rows[0];
                req.session.auto_adatai_rendsz = null;
                console.log(req.session.auto_adatai_alvaz)
                connection.release();
                callback(null,rows[0]);
            }
        });
    });
}

module.exports = new lekerd();