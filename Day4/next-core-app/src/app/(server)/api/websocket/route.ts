import WebSocket, { WebSocketServer } from 'ws';
import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';

// Create a singleton WebSocketServer instance
let wss: WebSocketServer;

// Keep track of all connected clients
const clients = new Set<WebSocket>();

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    // Parse the URL to get query parameters if needed
    const { pathname, query } = parse(req.url || '', true);
    
    // Check for correct HTTP method and headers
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed - WebSocket connections require GET');
        return;
    }
    
    // Check for necessary WebSocket headers
    const upgradeHeader = req.headers['upgrade']?.toLowerCase();
    if (!upgradeHeader || upgradeHeader !== 'websocket') {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request - Invalid WebSocket upgrade request');
        return;
    }
    
    // Initialize the WebSocketServer as a singleton
    if (!wss) {
        wss = new WebSocketServer({ noServer: true });
        
        // Set up server-wide event handlers
        wss.on('error', (error) => {
            console.error('WebSocket server error:', error);
        });
        
        wss.on('close', () => {
            console.log('WebSocket server closed');
            clients.clear();
        });
    }
    
    // Handle the WebSocket upgrade
    if (!res.writableEnded) {
        try {
            // Perform the upgrade
            wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
                // Emit connection event
                wss.emit('connection', ws, req);
                
                // Track the client
                clients.add(ws);
                console.log(`Client connected. Total connections: ${clients.size}`);
                
                // Set up client-specific event handlers
                ws.on('message', (message: WebSocket.Data) => {
                    try {
                        console.log(`Received message: ${message}`);
                        
                        // Echo the message back to the sender
                        ws.send(message);
                        
                        // Example of broadcasting to all clients:
                        // clients.forEach(client => {
                        //     if (client !== ws && client.readyState === WebSocket.OPEN) {
                        //         client.send(message);
                        //     }
                        // });
                    } catch (error) {
                        console.error('Error handling message:', error);
                    }
                });
                
                ws.on('error', (error) => {
                    console.error('WebSocket connection error:', error);
                });
                
                ws.on('close', (code, reason) => {
                    clients.delete(ws);
                    console.log(`Client disconnected (${code}). Total connections: ${clients.size}`);
                });
                
                // Send a welcome message
                ws.send('Connected to WebSocket server');
            });
        } catch (error) {
            console.error('Failed to upgrade connection:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error - WebSocket upgrade failed');
            return;
        }
    }
}