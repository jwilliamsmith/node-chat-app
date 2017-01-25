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
	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function() {

	});
});

let locationButton = jQuery('#send-location');

locationButton.on('click', () => {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported in your browser.');
	}
	navigator.geolocation.getCurrentPosition((position) => {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, () => {
		alert('Unable to fetch location.');
	} )
})