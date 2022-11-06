import createDebugger from 'debug';
import { WebSocketServer } from 'ws';
import { tokenToUser } from './app/http/middlewares/AuthMiddleware.js';

const debug = createDebugger('express-api:messaging');

const clients = [];

export function createWebSocketServer(httpServer) {
    debug('Creating WebSocket server');
    const wss = new WebSocketServer({
        server: httpServer,
    });

    // Handle new client connections.
    wss.on('connection', async function(ws, req) {
        debug('New WebSocket client connected');

        const user = await tokenToUser(req);

        debug(`User ${user._id} connected`);

        // Keep track of clients.
        clients.push({ "id": user._id, "socket": ws });

        // Listen for messages sent by clients.
        ws.on('message', (message) => {
            // Make sure the message is valid JSON.
            let parsedMessage;
            try {
                parsedMessage = JSON.parse(message);
            } catch (err) {
                // Send an error message to the client with "ws" if you want...
                return debug('Invalid JSON message received from client');
            }

            // Handle the message.
            onMessageReceived(ws, parsedMessage);
        });

        // Clean up disconnected clients.
        ws.on('close', () => {
            clients.splice(clients.indexOf(ws), 1);
            debug('WebSocket client disconnected');
        });
    });
}

export function broadcastMessage(message) {
    debug(
        `Broadcasting message to all connected clients: ${JSON.stringify(message)}`
    );
    // You can easily iterate over the "clients" array to send a message to all
    // connected clients.

    clients.forEach((client) => {
        client.send(JSON.stringify(message));
    });
}

export function sendMessageToClient(message, clientID) {
    debug(
        `Sending message to client ${client.id}: ${JSON.stringify(message)}`
    );
    // Find the client with the given ID.
    const client = clients.find((client) => client.id === clientID);

    if (client) {
        // Send the message to the client.
        client.socket.send(JSON.stringify(message));
    }
}

function onMessageReceived(ws, message) {
    debug(`Received WebSocket message: ${JSON.stringify(message)}`);
    // Do something with message...
    ws.send("Message : " + message.message);
}