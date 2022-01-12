var mysql =	require("../db.js"),
	mysqlPool = mysql.createPool();
const crypto = require("crypto");
var lekerd = function(){};

lekerd.prototype.lekerdRendszam = function(req, res, callback){
    rendszam = req.body.rendszams,
    details = [],
    lekerdquery = 'SELECT autó.Gyártó, autó.Típus, info.Évjárat, info.Állapot, info.Futottkm, info.VezetettSzervK, autó.Megbízhatóság, autó.Típushiba, info.Okmányok, info.Műszakiér, info.Alvázszám, info.Gumiabroncs FROM info INNER JOIN autó ON info.Autó_AID = autó.AID INNER JOIN gumiabroncs ON gumiabroncs.Info_ID = info.IID WHERE info.Rendszám = '+rendszam;
    mysqlPool.getConnection(function(err, connection){
		connection.query(lekerdquery, function(err, rows, fields){
            if(rows.length <= 0){
                connection.release();
                console.log("Nincs ilyen rendszámú")
            }else{
                req.session.auto = rows[0];
                connection.release();
                callback(null,rows[0]);
            }
        });
    });
}

module.exports = new lekerd();