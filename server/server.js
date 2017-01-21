'use strict';
const path = require('path');
const http = require('http');
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
	socket.on('disconnect', () => {
		console.log('client disconnected')
	})
})



server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

