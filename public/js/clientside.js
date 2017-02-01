'use strict';

class ClientSide {
	
	constructor(){
			
		this.socket = socket;
		this.room = room;

		this.altNameForm =  $('#form-alterar-name');
		this.sendMessageForm = $('#form-enviar-mensaje');
		this.mensajeEl = $('#mensaje');
		this.nameEl = $('#name');
		this.roomUrl = $('.room-url');

		this.submitAltNameForm = this.submitAltNameForm.bind(this);
		this.submitSendMessage = this.submitSendMessage.bind(this);

		this.addEventListeners();
		this.onStart();
	}

	addEventListeners(){

	}

	onStart(){
		console.log('On Client Side');
		this.roomUrl.val(window.location.href);
		this.submitAltNameForm();
		this.submitSendMessage();
	}

	submitAltNameForm(){
		//console.log(this.nameEl.val());
		this.altNameForm.submit( () => {
			let name = this.nameEl.val();
			socket.emit('change name', {name: this.nameEl.val(), room: this.room});
			this.nameEl.attr('disabled', 'disabled');
			this.altNameForm.children('button').hide();
			return false;
		});
	}

	submitSendMessage(){
		this.sendMessageForm.submit( () => {
			let message = this.mensajeEl.val();
			socket.emit('send message', {message: message, room: room});
			this.mensajeEl.val('').focus();
			return false;
		});
	}
}

window.addEventListener('load', () => new ClientSide() );


/*
$(function(){
	$('#form-alterar-nome').submit(function(){
		var nome = $('#nome').val();
		socket.emit('change name', {nome: nome, room: room});
	    $('#nome').attr('disabled','disabled');
	    $(this).children('button').hide();
			return false;
	});

	$('#form-enviar-mensagem').submit(function(){
		var mensagem = $('#mensagem').val();
		socket.emit('send message', {message: mensagem, room: room});
    	$('#mensagem').val('').focus();

		return false;
	});
	
	$('.room-url').val(window.location.href);
});
*/