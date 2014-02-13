var User = require('../model/User');

exports.index = function(req, res) {
	User.all(function(err, users) {
		if (err) throw err;
		res.json({
			artists: users,
		})
	})
}

exports.find = function(req, res) {
	User.find(req.params.id, function(err, user) {
		if(err) throw err;
		res.json({
			artist: user
		})
	})
}

exports.collections = function(req, res) {
	User.find(req.params.id, function(err, user) {
		if(err) throw err;
		user.collections(function(err, colls) {
			if (err) throw err;
			res.json({
				collections: colls
			})
		})
	})
}