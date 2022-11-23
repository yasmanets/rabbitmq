'use strict'

const amqp = require('amqplib/callback_api');
const debug = require('debug')('consumer');


const config = {
	URL: 'amqp://guest:guest@localhost:5672',
	QUEUE: 'test',
	MESSAGE: 'Test message'
}

amqp.connect(config.URL, function (err, connection) {
	if (err) {
		console.log(`Error: ${err}`);
		throw new Error(err);
	}

	debug('Connected');
	connection.createChannel(function (err, channel) {
		if (err) {
			console.log(`Error: ${err}`);
			throw new Error(err);
		}

		channel.assertQueue(config.QUEUE, { durable: false });
		debug(`Waiting for messages in ${config.QUEUE}. To exit press CTRL+C`);
		channel.consume(config.QUEUE, function (msg) {
			debug(`Received ${msg.content.toString()}`);
		}, {
			noAck: true
		});
	});
})