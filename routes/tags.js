var Tag = require('../model/Tag');

exports.index = function(req, res) {
	Tag.all(function(err, tags) {
		if (err) throw err;
		res.json({
			tags: tags,
		})
	})
}