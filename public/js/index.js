'use strict';
const socket = io();

function scrollToBottom () {
	let messages = jQuery('#messages'),
			newMessage = messages.children('li:last-child'),
			newMessageHeight = newMessage.innerHeight(),
			lastMessageHeight = newMessage.prev().innerHeight(),
			clientHeight = messages.prop('clientHeight'),
			scrollTop = messages.prop('scrollTop'),
			scrollHeight = messages.prop('scrollHeight'),
			aggregateHeight = clientHeight + scrollTop + newMessageHeight + lastMessageHeight;

	if (aggregateHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function() {
	console.log('connected to server')
});

socket.on('disconnect', function() {
	console.log('disconnected from server')
});

socket.on('newMessage', function(message) {
	let template = jQuery('#message-template').html();
	let formattedTime = moment(message.createdAt).format('h:mm a');
	let html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	jQuery('#messages').append(html);
	scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
	let formattedTime = moment(message.createdAt).format('h:mm a');
	let template = jQuery('#location-message-template').html();
	let html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});
	jQuery('#messages').append(html);	
	scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();
	let messageTextbox = jQuery('[name=message]');
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function() {
		messageTextbox.val('');
	});
});

let locationButton = jQuery('#send-location');

locationButton.on('click', () => {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported in your browser.');
	}
	locationButton.attr('disabled', 'disabled').text('Sending...');
	navigator.geolocation.getCurrentPosition((position) => {
		locationButton.removeAttr('disabled').text('Send Location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, () => {
		locationButton.removeAttr('disabled').text('Send Location');
		alert('Unable to fetch location.');
	});
});