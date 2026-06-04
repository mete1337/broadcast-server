import { WebSocket } from 'ws';
import readline from 'readline';
import startServer from './server.js';
import startClient from './client.js';
import { argv } from 'node:process'


const command = process.argv[2];

if (command === 'server') {
    startServer();
}
else if (command === 'connect') {
    startClient();
}
else {
    console.log('Invalid argument. Use "start" to run the server or "connect" to connect to the server')
}




