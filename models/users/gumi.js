var mysql =	require("../db.js"),
	mysqlPool = mysql.createPool();
const crypto = require("crypto");
var lekerdGumi = function(){};

lekerdGumi.prototype.gumikKilistaz = function(req, res, callback){
    lekerdquery = 'SELECT gumiabroncs.Gyarto, gumiabroncs.Evszak, gumiabroncs.Kategoria, gumiabroncs.Ar, gumiabroncs.Info_ID FROM gumiabroncs';
    mysqlPool.getConnection(function(err, connection){
		connection.query(lekerdquery, params, function(err, rows, fields){
            if(rows.length <= 0){
                connection.release();
                console.log("Nincs gumiabroncs az adatbázisban");
                req.session.gumiabroncs = undefined;
                callback(null,undefined);
            }else{
                req.session.gumiabroncs = rows[0];
                console.log(req.session.gumiabroncs);
                console.log("Lefutott");
                connection.release();
                callback(null,rows[0]);
            }
        });
    });
}
module.exports = new lekerdGumi;