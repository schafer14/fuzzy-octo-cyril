var User = require('../model/User');
var fs = require('fs');
var formidable = require('formidable');
var folder = './pictures/users/';

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

exports.login = function(req, res) {
	var data = req.body;
	User.auth({email: data.email, pass: data.pass}, function(err, user) {
		if(user) {
			req.session.uid = user.id;
			res.json({
				type: 'bg-success',
				msg: 'Logged in',
				user: user
			});
		} else {
			res.json({
				type: 'bg-danger',
				msg: 'Invalid credentials'
			})
		}
	});
};

exports.logout = function(req, res) {
	req.session.destroy(function(err) {
		if (err) throw err;
		res.json();
	});
};

exports.session = function(req, res) {
	if (!req.session.uid){
		res.json({});
	} else {
		User.find(req.session.uid, function(err, user) {
			if (err) throw err;
			res.json({ user: user });
		})
	}
}

exports.update = function(req, res) {
	var form = new formidable.IncomingForm();
	form.uploadDir = folder;
	form.keepExtensions = true;
	form.parse(req, function(err, fields, files) { 
		if (err) throw err;
		console.log(fields);
	});

	form.on('end', function() {
		var origin = this.openedFiles[0].path;
		User.findAndUpdate(1, {img: origin}, function(err) {
			if (err) throw err;
			res.render('photos', {title: 'Photos', filename:'template/layout'});
		})
	});
}
