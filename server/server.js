'use strict';
const path = require('path');
const http = require('http');
const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
	console.log('new client connected');
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));
	socket.on('disconnect', () => {
		console.log('client disconnected')
	});
	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		/*
		socket.broadcast.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
		*/
	});
})



server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

