'use strict';
const socket = io();
socket.on('connect', function() {
	console.log('connected to server')
});

socket.on('disconnect', function() {
	console.log('disconnected from server')
});

socket.on('newMessage', function(message) {
	console.log('new message', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
	let li = jQuery('<li></li>'),
		a  = jQuery('<a target="_blank">My current location</a>');

	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
	jQuery('#messages').append(li);	
})


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