'use strict';
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(publicPath));

app.get('/', () => {
	res.send('Hello cruel world.');
})

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

