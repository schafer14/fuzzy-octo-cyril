var Collection = require('../model/Collection');

exports.index = function(req, res) {
	Collection.all(function(err, colls) {
		if (err) throw err;
		res.json({
			collections: colls,
		})
	})
}