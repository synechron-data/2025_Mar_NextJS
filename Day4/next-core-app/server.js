// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const WebSocket = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// Initialize Next.js with dev mode enabled
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Set up WebSocket server and clients
let wss;
const clients = new Set();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        // Parse URL
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        // Let Next.js handle the request
        handle(req, res, parsedUrl);
    });

    // Create WebSocket server if it doesn't exist
    if (!wss) {
        wss = new WebSocket.Server({
            noServer: true
        });

        wss.on('connection', (ws) => {
            clients.add(ws);
            console.log(`Client connected. Total connections: ${clients.size}`);

            ws.on('message', (message) => {
                console.log(`Received message: ${message.toString()}`);
                ws.send(message.toString());
            });

            ws.on('close', () => {
                clients.delete(ws);
                console.log(`Client disconnected. Total connections: ${clients.size}`);
            });

            // Send a welcome message
            ws.send('Connected to WebSocket server');
        });
    }

    // Handle WebSocket upgrade requests
    server.on('upgrade', (request, socket, head) => {
        const pathname = parse(request.url).pathname;

        // Let Next.js handle its own WebSocket connections for HMR
        if (pathname.includes('/_next/')) {
            console.log(`Next.js HMR WebSocket request: ${pathname}`);
            return;
        }

        // Handle your application's WebSocket connections
        if (pathname === '/api/ws') {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, request);
            });
        }
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
        console.log('> Development mode:', dev);
    });
});