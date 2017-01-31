exports.user = require('./user');

exports.index = function (req, res){
	res.render('index', { title: "Express ADRIAN"});
}	

exports.room = function(req, res){
	var id = req.params.id;
	res.render( 'room',{
		title: 'private Room'
	});
}