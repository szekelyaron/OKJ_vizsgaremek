var mysql =	require("../db.js"),
	mysqlPool = mysql.createPool();
const crypto = require("crypto");
var lekerdGumi = function(){};

lekerdGumi.prototype.gumikKilistaz = function(req, res, callback){
    lekerdquery = 'SELECT gumiabroncs.GID, gumiabroncs.Gyarto, gumiabroncs.Evszak, gumiabroncs.Kategoria, gumiabroncs.Ar, gumiabroncs.Atmero, gumiabroncs.Oldalfal, gumiabroncs.Szelesseg FROM gumiabroncs';
    mysqlPool.getConnection(function(err, connection){
		connection.query(lekerdquery, function(err, rows, fields){
            if(rows.length <= 0){

                connection.release();
                console.log("Nincs gumiabroncs az adatbázisban");
                req.session.gumiabroncs = null;
                callback(null,undefined);
            }else{
                req.session.gumiabroncs = [];
                for(let row of rows){
                    req.session.gumiabroncs.push(row);
                }
                connection.release();
                callback(null,rows[0]);
            }
        });
    });
}
module.exports = new lekerdGumi;