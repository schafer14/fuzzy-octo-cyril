var db = require('../middleware/db').db;
var Photo = require('./Photo.js');


module.exports = Collection;

function Collection(obj) {
    for(key in obj) {
        this[key] = obj[key];
    }
}

Collection.find = function(id, cb) {
	var query = 'SELECT * FROM collection WHERE id=?';

	db.query(query, id, function(err, rows) {
		if (err) return cb(err);
		rows[0].photo = rows[0].cover_photo;
		delete rows[0].cover_photo;
		var coll = new Collection(rows[0]);
		cb(null, coll); 
	});
}

Collection.count = function(cb) {
	var query = 'SELECT COUNT(*) as count FROM collection';

	db.query(query, function(err, data) {
		if (err) return cb(err);
		return cb(null, data[0].count);
	});
}

Collection.prototype.save = function(cb) {
	if (!this.name) return cb(new Error('Must include name'));
	if (!this.owner_id) return cb(new Error('Must include owner_id'));
	this.description = this.description || '';
	this.cover_photo = this.cover_photo || '';

	var query = 'INSERT INTO collection (name, description, cover_photo, owner_id) '
		+ ' values (?, ?, ?, ?)'

	var params = [this.name, this.description, this.cover_photo, this.owner_id];

	db.query(query, params, function(err, rows) {
		if (err) return cb(err);
		cb(null, rows.insertId);
	})
}

Collection.prototype.delete = function(cb) {
	var query = 'DELETE FROM collection WHERE id=?';

	db.query(query, this.id, function(err, row) {
		if (err) return cb(err);
		cb();
	})
}

Collection.set = function(from, length, cb) {
	Collection.all(function(err, colls) {
		if (err) return cb(err);
		var ret = colls.slice(from, from+length);
		cb(null, ret);
	})
}

Collection.all = function(cb) {
	var query = 'SELECT * FROM collection';
	var colls = [];

	db.query(query, function(err, rows) {
		if (err) return cb(err);
		for (var row in rows) {
			rows[row].photo = rows[row].cover_photo;
			delete rows[row].cover_photo;
			colls.push(new Collection(rows[row]));
		}
		cb(null, colls);
	})
}

Collection.prototype.photos = function(cb) {
	var photos = [];
	var query = ''
		+ 'SELECT snapstock.photo.name as name, snapstock.photo.description, snapstock.photo.path, snapstock.photo.price, user.name as artist, collection.name as collection,collection.id as collection_id, user.id as user_id, snapstock.photo.created_at '
		+ 'FROM snapstock.photo '
		+ 'JOIN collection '
		+ 'ON snapstock.photo.collection_id = collection.id '
		+ 'JOIN user '
		+ 'ON snapstock.photo.user_id = user.id '
		+ 'WHERE collection_id=? AND approved=1';

	db.query(query, this.id, function(err, rows) {
		if (err) return cb(err);
		for(index in rows) {
			photos.push(new Photo(rows[index]));
		}
		cb(null, photos);
	})
}