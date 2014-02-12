var User = require('../model/User');

exports.index = function(req, res) {
	User.all(function(err, users) {
		if (err) throw err;
		res.json({
			artists: users,
		})
	})
}