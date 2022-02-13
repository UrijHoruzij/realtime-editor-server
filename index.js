('use strict');
const WebSocketServer = require('ws').WebSocketServer;
const wss = new WebSocketServer({ port: 3000 });

console.log('The server is running: 3000');

wss.on('connection', (ws) => {
	console.log(`Connected`);
	ws.on('message', (msg) => {
		wss.clients.forEach((client) => {
			if (client.readyState === 1) {
				client.send(msg.toString());
			}
		});
	});
	ws.on('disconnect', () => console.log(`Disconnected`));
});
