'use strict'

const amqp = require('amqplib/callback_api');
const debug = require('debug')('consumer');


const config = {
	URL: 'amqp://guest:guest@localhost:5672',
	QUEUE: 'task_queue',
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

		channel.assertQueue(config.QUEUE, { durable: true });
		debug(`Waiting for messages in ${config.QUEUE}. To exit press CTRL+C`);
		channel.consume(config.QUEUE, function (msg) {
			const secs = msg.content.toString().split('.').length - 1;
			debug(`Received ${msg.content.toString()}`);
			setTimeout(function () {
				debug('Done');
			}, secs * 1000);
		}, {
			noAck: true
		});
	});
})