var Photo = require('../model/Photo');
var formidable = require('formidable');
var db = require('../middleware/db').db;
var folder = './public/pictures/photos/';
var temp = './img/tmp/';

exports.index = function(req, res) {
	Photo.all(function(err, photos) {
		if (err) throw err;
		res.json({
			photos: photos,
		})
	})
}

exports.create = function(req, res) {
	var form = new formidable.IncomingForm();
	form.uploadDir = temp;
	form.keepExtensions = true;
	var coll_id;
	var price;

	form.parse(req, function(err, fields, files) {
		coll_id = fields.coll_id;
		price = fields.price;
	})

	form.on('progress', function(r, e) {
		console.log(r/e*100);
	});

	form.on('end', function() {
		this.openedFiles.forEach(function(o) {
			var query = 'INSERT INTO photo (name, price, ext, user_id, collection_id, path) values (?, ?, ?, ?, ?, ?);'
			db.query(query, [o.name, price, o.type, req.session.uid, coll_id, o.path], function(err, data) {
				if (err) {
					res.json({
						type: 'bg-danger',
						msg: 'Error saving photo'
					});
				} else {
					require('../process.js').fork;
					res.render('photos', {title: 'Photos', filename:'template/layout'});
				}
			});
		});
	})
}

exports.processed = function(req, res) {
	db.query('SELECT level FROM user WHERE id=?', req.session.uid, function(err, data) {
		if (data.level < 500) {
			res.json({
				type: 'bg-danger',
				msg: 'You do not have clearence to access this part of the website. This incident will be reported.'
			})
		} else {
			Photo.processed(function(err, photos) {
				if (err) throw err;
				res.json({
					photos: photos,
				})
			})
		}
	})
}

exports.approve = function(req, res) {
	if (req.body.approved === 'accept') {
		console.log('here');
		db.query('UPDATE photo SET approved = 1 WHERE id = ' + req.params.id, function(err) {
			if (err) throw err;
			res.json({
				type: 'bg-success',
				msg: 'Photo has been approved'
			});
		}) ;	
	} else {
		Photo.find(req.params.id, function(err, photo) {
			if (err) throw err;
			photo.delete(function(err) {
				if (err) throw err;
				res.json({
					type: 'bg-success',
					msg: 'Photo has been removed'
				});
			});
		});
	}
}

exports.update = function(req, res) {
	Photo.find(req.params.id, function(err, photo) {
		if (err) throw err;
		photo.update(req.body.name, req.body.price, function(err) {
			if (err) throw err;
			res.json({
				type: 'bg-success',
				msg: 'Photo has been updated'
			});
		});
	});
};