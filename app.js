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

var connections = [];

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
//app.get('users', routes.user.list);

io.on('connect', function(socket){
	connections.push(socket);
	console.log('user connected => ' + connections.length);

	var userid = socket.id;
	socket.emit('ready'); // emit ready message himself

	console.log(io.sockets.adapter.rooms);
	socket.emit('rooms', io.sockets.adapter.rooms);  // io.sockets.adapter.rooms => get all rooms from io space

	socket.on('join', function (room){
		socket.join(room);
		socket.broadcast.emit('new room', room); // emit all user connected message join user room
	})

	//change username
	socket.on('change name', function(data){
		var name = data.name;
		var room = data.room;
		var time = util.getCurrentTime();

		// set username to socket
		socket.set('username', name, function(){
			// emit new name only for user in that room
			socket.in(room).emit( 
				{ 
					name : name,
					time : time
				}
			);
			socket.broadcast.to(room).emit('user change name', 
				{
					userId : userid, 
					name : name, 
					time : time 
				}
			);
		}); 
	});

	socket.on('send message', function(data){
		var message = data.message;
		var time = util.getCurrentTime();
		var room = data.room;
		var name = '';
		socket.get('username', function(err, username){
			name = username ? username : userid;

			socket.in(room).emit('message sent', { message: message, time: time});
			socket.broadcast.to(room).emit('message sent by user', {message: message, name: name, time: time});
		});
	});

	socket.on('disconnect', function(){

		// this returns a list of all rooms this user is in
		//var rooms = io.sockets.adapter.roomClients[socket.id];
		console.log('=========== socket rooms =========');
		console.log(socket.rooms);
		
		var rooms = socket.rooms;
		//socket.rooms.forEach(function(room){
		for (var room in rooms) {	
	      	// For each room the user is in, excluding his own room
		    socket.leave(room);

		    socket.get('username', function(err, username){
		    	if(username){
		    		socket.broadcast.to(room).emit('user leave room', {name: username});
		    	}
		    });  
		}    
	    //});
		
		connections.splice(connections.indexOf(socket), 1);
		console.log('User desconnected, now user connected => ' + connections.length);

		setTimeout(function(){
			socket.broadcast.emit('rooms', io.sockets.adapter.rooms);
		}, 1000)
	})
})

http.listen(app.get('port'), function (){
	console.log('App listen port : ' + app.get('port'));
});