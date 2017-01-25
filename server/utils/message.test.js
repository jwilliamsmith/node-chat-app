'use strict';

const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate message object', () => {
		let from = 'Bob', text = 'Testing',
			message = generateMessage(from, text);
		expect(message).toInclude({from, text});
		expect(message.createdAt).toBeA('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		let from = 'Phil', lat = 100, lon = 200,
			message = generateLocationMessage(from, lat, lon),
			url = `https://www.google.com/maps?q=${lat},${lon}`;
		expect(message).toInclude({from, url});
		expect(message.createdAt).toBeA('number');
	});
})