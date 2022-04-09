var mysql =	require("mysql");

var DB = function(){};
DB.prototype.createPool = function(){
	return mysql.createPool({
			host     : 'localhost', // Hostname 'localhost' If locally connected
			user     : 'root',      // Username
			password : '',          // Password
			database: 'autok6',           // Database name
			connectionLimit : 100
		});
}

DB.prototype.getConnection = function(pool,callback){
	var self = this;
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log(err);
			callback(true);
			return;
		}
		connection.on('error', function(err) {
			if(err.code === "Nem sikerült csatlakozni az adatbázishoz") {
				connection.destroy();				
			} else {
				connection.release();
			}
			console.log(err);
			callback(true);
			return;
		});
		callback(null,connection);
	});
}

DB.prototype.createTransaction = function(pool,callback) {
	var self = this;
	self.getConnection(pool,function(err,connection){
		if(err) {
			console.log(err);
			callback(true);
			return;
		}
		connection.beginTransaction(function(err) {
			if(err){
				console.log(err);
				callback(true);
				return;
			}
			callback(null,connection)
		});
	});
}
module.exports = new DB();
