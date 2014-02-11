

exports.index = function(req, res){
  	res.render('photos', {title: 'Photos', filename:'template/layout'});
};