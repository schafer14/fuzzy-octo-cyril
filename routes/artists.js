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

exports.create = function(req, res) {
	var user = new User(req.body);
	user.save(function(err, id) {
		var type, msg;
		if (err) {
			type = 'bg-danger';
			msg = 'Something has gone wrong.';
			console.log(err.message);
		} else {
			type = 'bg-success';
			msg = 'Artist create.';
		}
		
		res.json({
			type: type,
			msg: msg
		});
	})
}