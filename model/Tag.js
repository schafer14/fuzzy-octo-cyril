var db = require('../middleware/db').db;
var Photo = require('./Photo');
var self = this;

module.exports = Tag;

function Tag(obj) {
	for(key in obj) {
		this[key] = obj[key];
	}
}

Tag.get = function(opt, cb) {
	var query = 'SELECT * FROM tag WHERE name=?';
	var params = opt.name;
	db.query(query, params, function(err, rows) {
		if (err) return cb(err);
		cb(null, new Tag(rows[0]));
	})
}

Tag.find = function(id, cb) {
	var query = 'SELECT * FROM tag WHERE id=?';
	db.query(query, id, function(err, rows) {
		if (err) return cb(err);
		cb(null, new Tag(rows[0]));
	})
}

Tag.all = function(cb) {
	var tags = [];
	var query = 'SELECT * FROM tag';
	db.query(query, function(err, rows) {
		if (err) return cb(err);
		for(index in rows) {
			tags.push(new Tag(rows[index]));
		}
		cb(null, tags);
	})
}

Tag.count = function(cb) {
	var query = 'SELECT COUNT(*) AS count FROM tag';
	db.query(query, function(err, data) {
		if (err) return cb(err);
		return cb(null, data[0].count);
	})
}

Tag.prototype.save = function(cb) {
	if (!this.name) return cb(new Error('Name is required')); 
	var query = 'INSERT INTO tag (name) values (?)';
	db.query(query, this.name, function(err, rows) {
		if (err) return cb(err);
		cb(null, rows.insertId);
	})
}

Tag.prototype.photos = function(cb) {
	var photos = [];
	var query = ''
	+ 'SELECT * '
	+ 'FROM photo '
	+ 'JOIN photos_tags '
	+ 'ON photo.id = photos_tags.photo_id '
	+ 'WHERE tag_id = ? AND approved=1 ';

	db.query(query, this.id, function(err, rows) {
		if (err) return cb(err);
		for (index in rows) {
			photos.push(new Photo(rows[index]));
		}
		cb(null, photos);
	})
}

Tag.search = function(t, cb) {
	var query = 'SELECT id FROM tag WHERE name=?'
	db.query(query, t, function(err, data) {
		if (err) throw err;
		if (data[0]) return cb(data[0].id);
		t = new Tag({name: t})
		t.save(function(err, id) {
			if (err) throw err;
			return cb(id);
		})
	});
};

Tag.addPhoto = function(photo_id, tag_id, cb) {
	var query = 'INSERT INTO photos_tags (photo_id, tag_id) values (?,?) '
	db.query(query, [photo_id, tag_id], function(err, data) {
		if (err) throw err;
		return cb();
	}) 
}
