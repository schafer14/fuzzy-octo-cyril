var fs = require('fs');
var gm = require('gm');
var im = gm.subClass({imageMagick: true})

exports.mark = function (file) {
	var origin = __dirname + '/img/temp/' + file;
	var dest = __dirname + '/public/pictures/photos/' + file;
	im(origin)
		.enhance()
		.resize(600, 600)
		.noProfile()
		.stroke('#911821')
		.font('nytimes', 24)
		.drawText(60, 60, 'SnapStock.au')
		.stroke('#108a93')
		.drawText(120, 120, 'SnapStock.au')
		.write(dest, function(err) {
			if (err) throw err;
		});
}


// #911821 red
// #108a93 blue
