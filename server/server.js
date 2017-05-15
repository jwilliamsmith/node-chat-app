'use strict';
const path = require('path');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const users = new Users();


app.use(express.static(publicPath));

io.on('connection', socket => {
	console.log('new client connected');

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and room name are required.')
			return;
		}
		socket.join(params.room)
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
		callback();
	});

	socket.on('disconnect', () => {
		let user = users.removeUser(socket.id);
		if(user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	});
	socket.on('createMessage', (message, callback) => {
		let user = users.getUser(socket.id);
		if(user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		};
	
		callback();
		
	});
	socket.on('createLocationMessage', (coords) => {
		let user = users.getUser(socket.id)
		if(user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	})
})



server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

