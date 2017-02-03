'use strict';

class MainRoom {
	constructor(){
		
		this.socket = socket;
		this.linkToEl = document.querySelector('.linkto');
		this.listRoomsEl = $('#list-rooms');

		this.generateGuid = this.generateGuid.bind(this);
		this.cleanListRomm = this.cleanListRoom.bind(this);
		this.onRoomSocket = this.onRoomSocket.bind(this);
		this.onNewRoomSocket = this. onNewRoomSocket.bind(this);

		this.onStart = this.onStart.bind(this)();
		this.addEventListeners();
		this.onSockets();
	}

	addEventListeners(){

	}

	onStart(){
		// Init Socket IO Client
		
		this.linkToEl.setAttribute('href', '/r/' + this.generateGuid() );
	}

	onSockets(){
		this.onRoomSocket();
		this.onNewRoomSocket();
	}

	cleanListRoom(){	
		// no borra
		this.listRoomsEl.val('');
	}

	
	onRoomSocket(){
		this.socket.on('rooms', (data) => {
			console.log('on get rooms socket=>', data);
			let keys = Object.keys(data); // get keys in array from data
			let lenKeys = keys.length;

			console.log(keys, lenKeys);
			this.cleanListRoom(); // clean List

			for( let i=0; i < lenKeys; i++){

				let rLink = keys[i].split("/")[1];

				const li = document.createElement('li');
				const a = document.createElement('a');
				a.href = "/r/" + keys[i];
				a.textContent = keys[i];
				//console.log(rLink);
				li.appendChild(a);

				this.listRoomsEl.append(li);
			}
		});
	}

	onNewRoomSocket(){
		
		//this.listRoomsEl.html("<li><a href='/r/'>aaaa</a></li>");
		console.log(this.listRoomsEl);
		this.socket.on('new room', (room) => {
			console.log('On room', room);
			this.listRoomsEl.append('<li><a href="/r/' + room + '">' + room + '</a></li>');
		});
	}

	generateGuid(){
		let result, i ,j;
		result = '';
		
		for(j=0; j<32; j++){
			if( j == 8 || j == 12 || j == 16 || j == 20)
				result = result + '-'; 
			
			i = Math.floor( Math.random()*16 ).toString(16).toUpperCase();
			result = result + i ;
		}
		
		return result;
	}
}

window.addEventListener('load', () => new MainRoom());