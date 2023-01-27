('use strict');
const WebSocketServer = require('ws').WebSocketServer;
const wss = new WebSocketServer({ port: 5000 });

console.log('The server is running: 5000');
let buffer = '';
wss.on('connection', (ws) => {
	console.log(`Connected`);
	ws.send(buffer);
	ws.on('message', (msg) => {
		buffer = msg.toString();
		wss.clients.forEach((client) => {
			if (client.readyState === 1) {
				client.send(msg.toString());
			}
		});
	});
	ws.on('disconnect', () => console.log(`Disconnected`));
});
