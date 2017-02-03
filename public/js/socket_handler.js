// sending to sender-client only
//socket.emit('message', "this is a test");

// sending to all clients, include sender
//io.emit('message', "this is a test");

// sending to all clients except sender
//socket.broadcast.emit('message', "this is a test");

// sending to all clients in 'game' room(channel) except sender
//socket.broadcast.to('game').emit('message', 'nice game');

// sending to all clients in 'game' room(channel), include sender
//io.in('game').emit('message', 'cool game');

// sending to sender client, only if they are in 'game' room(channel)
//socket.to('game').emit('message', 'enjoy the game');

// sending to all clients in namespace 'myNamespace', include sender
//io.of('myNamespace').emit('message', 'gg');

// sending to individual socketid
//socket.broadcast.to(socketid).emit('message', 'for your eyes only');
//
//

class SocketHandler {
	
	constructor(){
		
		this.socket = socket;
		this.room = room;

		//Elements
		this.contentChatEl = $('.content-chat');
		this.rowAltName = $('.row-alterar-name');
		this.sourceStatus = $('#status-template');
		this.sourceMessage = $('#message-template');
		this.coments = $('#comments');
		this.olComents = $('#comments > ol');
		//Methods
		this.onReadySocket = this.onReadySocket.bind(this);
		this.onNameChangedSocket = this.onNameChangedSocket.bind(this);
		this.onMessageSentSocket = this.onMessageSentSocket.bind(this);
		this.onUserChangeNameSocket = this.onUserChangeNameSocket.bind(this);
		this.onMessageSentByUserSocket = this.onMessageSentByUserSocket.bind(this);
		this.mountStatusMessage = this.mountStatusMessage.bind(this);
		this.mountChatMessage = this.mountChatMessage.bind(this);
		this.scroolBottomChat = this.scroolBottomChat.bind(this);
		
		this.onStart = this.onStart.bind(this)();

		this.addEventListeners();
		this.onSockets();
	}

	addEventListeners(){

	}

	onStart(){
		//console.log('on socket handler');
	}

	onSockets(){
		this.onReadySocket();
		this.onNameChangedSocket();
		this.onMessageSentSocket();
		this.onUserChangeNameSocket();
		this.onMessageSentByUserSocket();
		this.onUserLeaveRoomSocket();
	}

	onReadySocket() {
		this.socket.on('ready',(data) => { // check why no firee
			console.log('ready firee ' + room);
			console.log(this.socket.id);
		 	this.socket.emit('join', room);
		});
	}

	onNameChangedSocket(){
		//console.log('on NaemChangedSocket client');
		this.socket.on('name changed',(data) => {
			console.log('name changed fire');
			this.mountStatusMessage(`Nombre, <strong> ${data.name} </strong>`);
			console.log(this.contentChatEl, this.rowAltName);
			this.contentChatEl.show()
			this.rowAltName.hide();
		});
	}

	//broadcast
	onUserChangeNameSocket(){
		this.socket.on('user changed name', (data) => {
			console.log('user changed name fire');
			this.mountStatusMessage(`El usuario <strong> ${data.name} ingreso </strong>`);
		});
	}

	onMessageSentSocket(){
		this.socket.on('message sent', (data) => {
			console.log('message sent fire');
			this.mountChatMessage('Me', data.message, data.time);
		});
	}


	onMessageSentByUserSocket(){
		this.socket.on('message sent by user', (data) => {
			console.log('message sent by user fire');
			//console.log(data.name, data.message, data.time);
			this.mountChatMessage(data.name, data.message, data.time);
		});
	}

	onUserLeaveRoomSocket(){
		this.socket.on('user leave room', (data) => {
			this.mountStatusMessage(`El usuario <strong> ${data.name} </strong>`);
		});
	}

	mountStatusMessage(message){
		console.log(message);
		let template = Handlebars.compile(this.sourceStatus.html());
		let context = {message : message};
		let html =  template(context);

		this.olComents.append(html);
		this.scroolBottomChat();
	}

	mountChatMessage(author, message, time){
		let template = Handlebars.compile(this.sourceMessage.html());
		let context = {author: author, body:message, time: time};
		let html = template(context);

		this.olComents.append(html);
		this.scroolBottomChat();
	}

	scroolBottomChat(){
		console.log(this.coments);
		let element = this.coments[0];
		element.scroolTop = element.scroolHeight;
	}
}

//$(document).ready(function(){
	new SocketHandler();
//});