import { WebSocket } from 'ws';
import readline from 'readline';


function startClient() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter your username: ', (username) => {
        const client = new WebSocket(`ws://localhost:8080`, {
            headers: {
                'username': username
            }
        });

        client.on('open', () => {
            console.log('Connected to the server. You can start sending messages.');
            rl.on('line', (input) => {
                if (input.toLowerCase() === 'exit') {
                    console.log('Exiting the chat. Goodbye!');
                    client.close();
                    rl.close();
                    return;
                }
                client.send(input);
            });
        });

        client.on('message', (data) => {
            console.log(data.toString());
        });

        client.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });
}
export default startClient;