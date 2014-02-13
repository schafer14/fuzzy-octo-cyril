var Collection = require('../model/Collection');

exports.index = function(req, res) {
	Collection.all(function(err, colls) {
		if (err) throw err;
		res.json({
			collections: colls,
		});
	});
};

exports.find = function(req, res) {
	Collection.find(req.params.id, function(err, coll) {
		if (err) throw err;
		coll.photos(function(err, photos) {
			if (err) throw err;
			res.json({
				collection: coll,
				photos: photos
			});
		});
	});
};