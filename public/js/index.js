'use strict';

class MainRoom {
	constructor(){
		
		this.socket = io('http://localhost:3001/');
		this.linkToEl = document.querySelector('.linkto');
		this.listRoomsEl = document.querySelector('#list-rooms');

		this.generateGuid = this.generateGuid.bind(this);
		this.cleanListRomm = this.cleanListRoom.bind(this);
		this.onRoomSocket = this.onRoomSocket.bind(this);
		this.onNewRoomSocket = this. onNewRoomSocket.bind(this);

		this.onStart = this.onStart.bind(this)();
		this.addEventListeners();
	}

	addEventListeners(){

	}

	onStart(){
		// Init Socket IO Client
		
		this.linkToEl.setAttribute('href', '/r/' + this.generateGuid() );

		this.onRoomSocket();
	}

	cleanListRoom(){
		this.listRoomsEl.innerHtml = '';
	}

	onRoomSocket(){
		this.socket.on('rooms', (data) => {
			let keys = Object.keys(data); // get keys in array from data
			let lenKeys = keys.length;

			this.cleanListRoom(); // clean List

			for( let i=1; i < lenKeys; i++){
				let rLink = keys[i].split("/")[1];

				const li = document.createElement('li');
				const a = document.createElement('a');
				a.href = "/r/" + keys[i];
				a.innerHtml = rLink;
				li.appendChild(a);
				this.listRoomsEl.appendChild(li);
			}
		});
	}

	onNewRoomSocket(){
		this.socket.on('newRoom', (room) => {
			this.listRoomsEl.innerHtml = '<li><a href="/r/' + room + '">' + room + '</a></li>';
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