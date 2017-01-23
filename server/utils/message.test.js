'use strict';

const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate message object', () => {
		let from = 'Bob', text = 'Testing',
			message = generateMessage(from, text);
		expect(message).toInclude({from, text});
		expect(message.createdAt).toBeA('number');
	});
});