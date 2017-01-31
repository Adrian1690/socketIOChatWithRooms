
class SocketHandler {
	
	constructor(){
		console.log('ready for the action');

		this.socket = io('http://localhost:3001/');
		this.room = window.location.href.split('/')[4];

		this.onStart = this.onStart.bind(this)();
	}

	addEventListeners(){

	}

	onStart(){

	}

	onReadySocket() {
		this.socket.on('ready', (data) => {
			this.socket.emit('join', room)
		});
	}

}
window.addEventListener('load', () => new SocketHandler)