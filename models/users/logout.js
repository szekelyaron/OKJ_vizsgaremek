var mysql =	require("../db.js"),
	mysqlPool = mysql.createPool();

var logout = function(){};

logout.prototype.logoutUser = function(req, res, callback){
    var sess = req.session.user;
    if(sess){
        req.session.user = null;
        return callback(null, {'success': true, "message": "Sikeres kijelentkezés"});
    }
    callback(null, {'success': true, "message": "Sikeres kijelentkezés"});
}

module.exports = new logout();