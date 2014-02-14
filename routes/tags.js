var Tag = require('../model/Tag');

exports.index = function(req, res) {
	Tag.all(function(err, tags) {
		if (err) throw err;
		res.json({
			tags: tags,
		})
	})
}

exports.find = function(req, res) {
	Tag.find(req.params.id, function(err, tag) {
		if (err) throw err;
		tag.photos(function(err, photos) {
			if (err) throw err;
			res.json({
				tag: tag,
				photos: photos
			});
		});
	});
};