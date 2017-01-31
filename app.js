/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http').Server(app);
var path = require('path');
var util = require('./util/functions');
//var bodyParser = require('body-parser'); // install
//var cookieParser = require('cookie-parser'); // install
//var session = require('express-session');//
var io = require('socket.io')(http); 

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
//app.get('users', routes.user.list);

io.on('connect', function(socket){
	console.log('user connected');
	socket.on('disconnect', function(){
		console.log('User desconnected');
	})
})

http.listen(app.get('port'), function (){
	console.log('App listen port : ' + app.get('port'));
});