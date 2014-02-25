var Photo = require('../model/Photo');
var formidable = require('formidable');
var db = require('../middleware/db').db;
var folder = './public/pictures/photos/';
var temp = './temp';

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
					res.render('photos', {title: 'Photos', filename:'template/layout'});
				}
			});
		});
	})
}