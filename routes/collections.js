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

exports.create = function(req, res) {
	var coll = new Collection({
		name: req.body.name,
		description: req.body.desc, 
		owner_id: req.session.uid
	});

	coll.save(function(err, id) {
		if (err) {
			res.json({
				type: 'bg-danger',
				msg: 'Error saving collection'
			});
		} else {
			Collection.find(id, function(err, coll) {
				if (err) {
					res.json({
						type: 'bg-danger',
						msg: 'Something has gone wrong with your collection'
					})
				} else {
					res.json({
						type: 'bg-success',
						msg: 'Collection has been created',
						coll: coll
					})
				}
			})
		}
	})
}