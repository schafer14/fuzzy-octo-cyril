var db = require('../middleware/db').db;


module.exports = User;

function User(obj) {
	for(key in obj) {
		this[key] = obj[key];
	}
}

User.prototype.save = function(fn, alt_db) {
	db = alt_db || db;
	console.log(db);

	var query = 'INSERT INTO user (name, email, password, img, description)' 
	 	+ 'values (?, ?, ?, ?, ?)';

	 var params = [this.name, this.email, this.pass, this.img, this.description];

	db.query(query, 
		params,
		function(err, rows) {
		if (err) return fn(err);
		fn(rows.insertId);
	});
};

User.find = function(id, fn, alt_db) {
	fn(user);
};