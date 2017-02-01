
class SocketHandler {
	
	constructor(){
		

		this.socket = socket;
		this.room = room;

		//Elements
		this.contentChatEl = document.querySelector('.content-chat');
		this.rowAltName = document.querySelector('.row-alterar-name');
		this.sourceStatus = document.querySelector('#status-template');
		this.sourceMessage = document.querySelector('#message-template');
		this.coments = document.querySelector('#comments');
		this.olComents = document.querySelector('#comments > ol');
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
		console.log('on socket handler');
	}

	onSockets(){
		this.onNameChangedSocket();
		this.onMessageSentSocket();
		this.onUserChangeNameSocket();
		this.onMessageSentByUserSocket();
		this.onUserLeaveRoomSocket();
	}

	onReadySocket() {
		this.socket.on('ready', (data) => {
			this.socket.emit('join', room);
		});
	}

	onNameChangedSocket(){
		this.socket.on('name changed',(data) => {
			this.mountStatusMessage(`Nombre, <strong> ${data.name} </strong>`);
		});
		this.contentChatEl.style.display = 'block';
		this.rowAltName.style.display = 'hide';
	}

	onMessageSentSocket(){
		this.socket.on('message sent', (data) => {
			mountChatMessage('Me', data.message, data.time);
		});
	}

	onUserChangeNameSocket(){
		this.socket.on('user changed name', (data) => {
			this.mountStatusMessage(`El usuario <strong> ${data.name} </strong>`);
		});
	}

	onMessageSentByUserSocket(){
		this.socket.on('message sent by user', (data) => {
			mountChatMessage(data.name, data.message, data.time);
		});
	}

	onUserLeaveRoomSocket(){
		this.socket.on('user leave room', (data) => {
			mountStatusMessage(`El usuario <strong> ${data.name} </strong>`);
		});
	}

	mountStatusMessage(message){
		let template = Handlebars.compile(this.sourceStatus.innerHtml);
		let context = {message : message};
		let html =  template(context);

		this.olComents.innerHtml = html;
		this.scroolBottomChat();
	}

	mountChatMessage(author, message, time){
		let template = Handlebars.compile(this.sourceMessage.innerHtml);
		let context = {author: author, body:message, time: time};
		let html = template(context);

		this.olComents.innerHtml = html;
		this.scroolBottomChat();
	}

	scroolBottomChat(){
		let element = this.comments[0];
		element.scroolTop = element.scroolHeight;
	}
}

window.addEventListener('load', () => new SocketHandler() );