var db = require('../middleware/db').db;


module.exports = Photo;

function Photo(obj) {
    for(key in obj) {
        this[key] = obj[key];
    }
}

Photo.find = function(id, cb) {
	var query = 'SELECT * FROM photo WHERE id=?';
	db.query(query, id, function(err, rows) {
		if (err) return cb(err);
		cb(null, new Photo(rows[0]));
	})
}

Photo.all = function(cb) {
	var photos = [];
	var query = ''
		+ 'SELECT photo.name as name, photo.description, photo.path, photo.price, user.name as artist, collection.name as collection,collection.id as collection_id, user.id as user_id, photo.created_at '
		+ 'FROM photo '
		+ 'JOIN user '
		+ 'ON user.id = user_id '
		+ 'JOIN collection '
		+ 'ON collection.id = collection_id '
		+ 'ORDER BY photo.created_at DESC; ';
	
	db.query(query, function(err, rows) {
		if (err) return cb(err);
		for(index in rows) {
			photos.push(new Photo(rows[index]));
		}
		cb(null, photos);
	})
}

Photo.count = function(cb) {
	var query = 'SELECT COUNT(*) AS count FROM photo';
	db.query(query, function(err, data) {
		if (err) return cb(err);
		cb(null, data[0].count);
	})
}

Photo.prototype.delete = function(cb) {
	var query = 'DELETE FROM photo WHERE id=?';
	db.query(query, this.id, function(err) {
		if (err) return cb(err);
		cb();
	})
}

Photo.prototype.save = function(cb) {
	if (!this.user_id) return cb(new Error('Must have user_id'));
	if (!this.collection_id) return cb(new Error('Must have collection_id'));
	if (!this.name) return cb(new Error('Must have name'));
	this.description = this.description || '';
	this.price = this.price || 0;
	if (!this.ext) return cb(new Error('Must have ext'));
	if (!this.path) return cb(new Error('Must have path'));

	var query = 'INSERT INTO photo (name, description, price, ext, path, user_id, collection_id) '
		+ ' values (?, ?, ?, ?, ?, ?, ?)';

	var params = [this.name, this.description, this.price, this.ext,
		this.path, this.user_id, this.collection_id];

	db.query(query, params, function(err, rows) {
		if (err) return cb(err);
		cb(null, rows.insertId);
	})	


}