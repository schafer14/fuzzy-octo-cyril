var Photo = require('../model/Photo');

exports.index = function(req, res) {
	Photo.all(function(err, photos) {
		if (err) throw err;
		res.json({
			photos: photos,
		})
	})
}