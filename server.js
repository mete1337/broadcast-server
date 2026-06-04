import WebSocket, { WebSocketServer } from 'ws';


function startServer() {
    const wss = new WebSocketServer({
        port: 8080
    });
    const activeClients = new Map();


    wss.on('connection', function connection(ws, req) {
        const ip = req.socket.remoteAddress;

        const username = req.headers['username'] || null;

        if (username) {
            console.log(`A client connected with username: ${username} and IP: ${ip}`);
        }
        else {
            console.log(`A client connected with IP: ${ip}`);
        }

        activeClients.set(ws, { ip, username });

        const welcomeMessage = `Welcome ${username || ip}! There are currently ${wss.clients.size} clients connected.`;

        ws.send(welcomeMessage);

        ws.on("error", console.error);

        ws.on('message', function message(data) {

            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    const sender = activeClients.get(ws);
                    const username = sender.username;
                    const messageToSend = username ? `${username}: ${data}` : `Client ${sender.ip}: ${data}`;
                    client.send(messageToSend);
                }
            });
        });


        ws.on('error', console.error);

        ws.on('close', () => {
            const clientInfo = activeClients.get(ws);
            const ip = clientInfo ? clientInfo.ip : 'Unknown IP';
            const username = clientInfo ? clientInfo.username : 'Unknown User';
            console.log(`Client ${username} with IP ${ip} disconnected.`);
            activeClients.delete(ws);
        });
    });
};
export default startServer;







