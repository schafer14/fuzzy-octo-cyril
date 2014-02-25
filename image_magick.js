var fs = require('fs');
var gm = require('gm');
var im = gm.subClass({imageMagick: true})

var root = __dirname + '/public/pictures/users/1101593b9f578b47cbfd520baca2c47f';
var origin = root + '.jpg';
var dest = root + 'new.jpg';

imager(origin, dest);



function imager(origin, dest) {
	im(origin)
		.enhance()
		.resize(600, 600)
		.noProfile()
		.stroke('#911821')
		.font('Helvetica.ttf', 24)
		.drawText(60, 60, 'SnapStock.au')
		.stroke('#108a93')
		.drawText(120, 120, 'SnapStock.au')
		.write(dest, function(err) {
			if (err) throw err;
		});
}

// #911821 red
// #108a93 blue
// Font 'Lobster', cursive