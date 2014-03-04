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

exports.create = function(req, res) {
	var tag_name = req.body.tag_name;
	var photo_id = req.body.photo_id;
	Tag.search(tag_name, function(tag_id) {
		Tag.addPhoto(photo_id, tag_id, function(err) {
			if (err) throw err;
			Tag.all(function(err, tags) {
				res.json({
					type: 'bg-success',
					msg: 'Tag created',
					tags: tags
				});
			});
		});
	});
};