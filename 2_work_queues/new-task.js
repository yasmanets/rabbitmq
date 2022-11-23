'use strict';

const amqp = require('amqplib/callback_api');
const debug = require('debug')('producer');

const config = {
	URL: 'amqp://guest:guest@localhost:5672',
	QUEUE: 'task_queue',
	MESSAGE: process.argv.slice(2).join(' ') || 'Hello World',
};

amqp.connect(config.URL, function(err, connection) {
	if(err) {
		console.log(`Error: ${err}`);
		throw new Error(err);
	}

	debug('Connected');
	connection.createChannel(function (err, channel) {
		if(err) {
			console.log(`Error: ${err}`);
			throw new Error(err);
		}
		
		channel.assertQueue(config.QUEUE, { durable: true });
		channel.sendToQueue(config.QUEUE, Buffer.from(config.MESSAGE), { persistent: true});
		debug('Sent');
	});
	setTimeout(function() {
        connection.close();
		debug('Disconnected');
        process.exit(0);
    }, 500);
});