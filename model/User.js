// var mysql = require('mysql');
// var db = mysql.createConnection();

module.exports = User;

function User(obj) {
	return;
}

User.prototype.save = function(fn) {
	fn();
};

User.find = function(id, fn) {
	fn();
};