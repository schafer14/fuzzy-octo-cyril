var db = require('./middleware/db').db
var fs = require('fs');
var gm = require('gm');
var im = gm.subClass({imageMagick: true})
var conf = require('./middleware/config');
var Email = require('email').Email;

db.query('SELECT * FROM photo WHERE processed = 0', function(err, photos) {
	photos.forEach(function(photo) {
		var parts = photo.path.split('/');
		photo.path = parts[parts.length -1];
		waterMark(photo.path, function(err) {
			if (err) throw err;
			db.query('UPDATE photo SET processed = 1 WHERE id = ' + photo.id, function(err) {
				if(err) throw err;
			})
		});
	});
	email(function(err) {
		if(err) throw err;
	});
})



function waterMark (file, cb) {
	var origin = __dirname + '/img/tmp/' + file;
	var dest = __dirname + '/public/pictures/photos/' + file;
	im(origin)
		.enhance()
		.resize(600, 600)
		.noProfile()
		.stroke('#911821')
		.font('nytimes', 24)
		.drawText(60, 60, 'SnapStock.au')
		.write(dest, function(err) {
			if (err) return cb(err);
		});

	cb();
}

function email (cb) {
	db.query('SELECT COUNT(*) as count FROM photo WHERE approved = 0', function(err, data) {
		var count = data[0].count;
		var text = 'Hi Nikki, \n This is an update from snapstock.au: You have ' + count + ' new photos to approve.';
		var mail = new Email({
			from: 'snapstock.au@gmail.com',
			to: conf.email,
			subject: 'Update from snapstock.au',
			body: text
		});

		mail.send(function(err) {
			if (err) throw err;
		});
		cb();
	});
}