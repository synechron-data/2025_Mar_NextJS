'use client'

import { useEffect, useState, useRef } from 'react';

// Define message types for better structure
interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'server' | 'system';
  timestamp: Date;
}

const RealisticSocketComponent = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [connected, setConnected] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [username, setUsername] = useState(`User_${Math.floor(Math.random() * 10000)}`);
    const [isTyping, setIsTyping] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const socketRef = useRef<WebSocket | null>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageIdCounter = useRef(0);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Connection management
    const connectWebSocket = () => {
        // Prevent multiple connection attempts
        if (socketRef.current && (socketRef.current.readyState === WebSocket.OPEN || 
                                socketRef.current.readyState === WebSocket.CONNECTING)) {
            return; // Already connected or connecting
        }

        // Set connecting state
        setConnecting(true);
        
        try {
            const ws = new WebSocket(`ws://${window.location.host}/api/ws`);
            socketRef.current = ws;
            
            ws.onopen = () => {
                setConnected(true);
                setConnecting(false);
                
                // Add system message for connection
                addMessage({
                    id: `system-${Date.now()}`,
                    text: "You've connected to the chat room",
                    sender: 'system',
                    timestamp: new Date()
                });
                
                // Send a connection message with username
                const connectionMsg = JSON.stringify({
                    type: 'connect',
                    username: username,
                    timestamp: new Date()
                });
                ws.send(connectionMsg);
            };

            ws.onmessage = (event) => {
                try {
                    // Try to parse the message as JSON
                    const data = JSON.parse(event.data);
                    
                    if (data.type === 'typing') {
                        setIsTyping(data.isTyping);
                    } else if (data.type === 'message') {
                        addMessage({
                            id: `server-${Date.now()}-${Math.random()}`,
                            text: data.text,
                            sender: 'server',
                            timestamp: new Date(data.timestamp)
                        });
                    } else if (data.type === 'system') {
                        addMessage({
                            id: `system-${Date.now()}-${Math.random()}`,
                            text: data.text,
                            sender: 'system',
                            timestamp: new Date(data.timestamp)
                        });
                    }
                } catch (e) {
                    // If it's not valid JSON, treat as a simple text message
                    console.error(e);
                    addMessage({
                        id: `server-${Date.now()}-${Math.random()}`,
                        text: event.data,
                        sender: 'server',
                        timestamp: new Date()
                    });
                }
            };

            ws.onclose = () => {
                setConnected(false);
                setConnecting(false);
                socketRef.current = null;
                
                // Add system message for disconnection
                addMessage({
                    id: `system-${Date.now()}`,
                    text: "You've been disconnected from the chat room",
                    sender: 'system',
                    timestamp: new Date()
                });
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                setConnecting(false);
                // Error message
                addMessage({
                    id: `system-${Date.now()}`,
                    text: "Connection error occurred",
                    sender: 'system',
                    timestamp: new Date()
                });
            };
        } catch (error) {
            console.error('Error creating WebSocket:', error);
            setConnecting(false);
            socketRef.current = null;
            
            // Error message
            addMessage({
                id: `system-${Date.now()}`,
                text: "Failed to establish connection",
                sender: 'system',
                timestamp: new Date()
            });
        }
    };
    
    const disconnectWebSocket = () => {
        // Close socket if open
        if (socketRef.current) {
            const socket = socketRef.current;
            
            // Only attempt to close if the socket is actually open
            if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                // Send disconnection message
                try {
                    const disconnectMsg = JSON.stringify({
                        type: 'disconnect',
                        username: username,
                        timestamp: new Date()
                    });
                    socket.send(disconnectMsg);
                } catch (e) {
                    console.error('Error sending disconnect message', e);
                }
                
                socketRef.current = null; // Clear ref before closing
                socket.close(1000, 'User disconnected');
            } else {
                socketRef.current = null;
            }
        }
    };

    // Add a message to the chat
    const addMessage = (message: ChatMessage) => {
        setMessages(prev => [...prev, message]);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            // Clear typing timeout
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
                typingTimeoutRef.current = null;
            }
            
            // Close socket if open
            if (socketRef.current) {
                const socket = socketRef.current;
                
                // Only attempt to close if the socket is actually open
                if (socket.readyState === WebSocket.OPEN) {
                    socketRef.current = null; // Clear ref before closing
                    socket.close(1000, 'Component unmounting');
                } else {
                    socketRef.current = null;
                }
            }
        };
    }, []);
    
    const sendMessage = () => {
        if (socketRef.current?.readyState === WebSocket.OPEN && inputMessage.trim()) {
            // Create message object
            const messageId = `user-${Date.now()}-${messageIdCounter.current++}`;
            const messageObj: ChatMessage = {
                id: messageId,
                text: inputMessage,
                sender: 'user',
                timestamp: new Date()
            };
            
            // Add to local message list
            addMessage(messageObj);
            
            // Send to server
            const messageToSend = JSON.stringify({
                type: 'message',
                text: inputMessage,
                username: username,
                timestamp: new Date()
            });
            socketRef.current.send(messageToSend);
            
            // Clear input
            setInputMessage('');
            
            // Reset typing indicator
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
                typingTimeoutRef.current = null;
                
                // Send stopped typing notification
                const typingMsg = JSON.stringify({
                    type: 'typing',
                    username: username,
                    isTyping: false
                });
                socketRef.current.send(typingMsg);
            }
        }
    };
    
    // Handle typing indicator
    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
        
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            // Clear existing timeout
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            
            // Send typing indicator
            const typingMsg = JSON.stringify({
                type: 'typing',
                username: username,
                isTyping: true
            });
            socketRef.current.send(typingMsg);
            
            // Set timeout to clear typing indicator
            typingTimeoutRef.current = setTimeout(() => {
                if (socketRef.current?.readyState === WebSocket.OPEN) {
                    const typingMsg = JSON.stringify({
                        type: 'typing',
                        username: username,
                        isTyping: false
                    });
                    socketRef.current.send(typingMsg);
                }
                typingTimeoutRef.current = null;
            }, 1000);
        }
    };
    
    // Format timestamp
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">WebSocket Chat</h5>
                <div className="d-flex align-items-center">
                    <button 
                        className="btn btn-sm btn-outline-light me-2"
                        onClick={() => setShowSettings(!showSettings)}
                    >
                        <i className="bi bi-gear-fill"></i>
                    </button>
                    <div className={`rounded-circle me-2 ${connected ? 'bg-success' : 'bg-danger'}`} style={{ width: '10px', height: '10px' }}></div>
                    <span className="small">{connected ? 'Connected' : 'Disconnected'}</span>
                </div>
            </div>
            
            {showSettings && (
                <div className="card-body border-bottom bg-light">
                    <div className="row g-2">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label">Your Username</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)}
                                    maxLength={20}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-end">
                            <div className="d-flex w-100">
                                <button 
                                    className="btn btn-success me-2 w-50" 
                                    onClick={connectWebSocket}
                                    disabled={connected || connecting}
                                >
                                    {connecting ? 'Connecting...' : 'Connect'}
                                </button>
                                <button 
                                    className="btn btn-danger w-50" 
                                    onClick={disconnectWebSocket}
                                    disabled={!connected}
                                >
                                    Disconnect
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="card-body">
                <div className="chat-messages border rounded p-3 mb-3" style={{ height: '350px', overflowY: 'auto' }}>
                    {messages.length === 0 ? (
                        <div className="text-center text-muted py-5">
                            <i className="bi bi-chat-dots" style={{ fontSize: '2rem' }}></i>
                            <p className="mt-2">No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    className={`message mb-2 ${
                                        msg.sender === 'system' 
                                            ? 'text-center' 
                                            : msg.sender === 'user' 
                                                ? 'd-flex justify-content-end' 
                                                : 'd-flex justify-content-start'
                                    }`}
                                >
                                    {msg.sender === 'system' ? (
                                        <div className="system-message small text-muted py-1">
                                            {msg.text}
                                        </div>
                                    ) : (
                                        <div className={`message-content ${
                                            msg.sender === 'user' 
                                                ? 'bg-primary text-white' 
                                                : 'bg-light'
                                        } p-2 px-3 rounded-3 shadow-sm`}
                                        style={{ maxWidth: '75%' }}
                                        >
                                            {msg.sender === 'server' && (
                                                <div className="sender-name small fw-bold">
                                                    {/* We'd extract username from server message in a real app */}
                                                    Server User
                                                </div>
                                            )}
                                            <div>{msg.text}</div>
                                            <div className={`timestamp small ${
                                                msg.sender === 'user' ? 'text-white-50' : 'text-muted'
                                            } text-end`}>
                                                {formatTime(msg.timestamp)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {isTyping && (
                                <div className="typing-indicator d-flex align-items-center text-muted small mt-2">
                                    <div className="typing-animation me-2">
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                    </div>
                                    Someone is typing...
                                </div>
                            )}
                            
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>
                
                <div className="input-group">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={handleTyping}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type your message here..."
                        className="form-control"
                        disabled={!connected}
                    />
                    <button
                        onClick={sendMessage}
                        className="btn btn-primary"
                        disabled={!connected || !inputMessage.trim()}
                    >
                        <i className="bi bi-send"></i> Send
                    </button>
                </div>
            </div>
            
            <div className="card-footer bg-light small text-muted">
                <div className="d-flex justify-content-between align-items-center">
                    <span>
                        {connected 
                            ? `Connected as ${username}` 
                            : connecting 
                                ? "Connecting to chat server..." 
                                : "Disconnected from chat server"}
                    </span>
                    {!showSettings && (
                        <div className="d-flex">
                            <button 
                                className="btn btn-sm btn-success me-2" 
                                onClick={connectWebSocket}
                                disabled={connected || connecting}
                            >
                                Connect
                            </button>
                            <button 
                                className="btn btn-sm btn-danger" 
                                onClick={disconnectWebSocket}
                                disabled={!connected}
                            >
                                Disconnect
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            <style jsx>{`
                .typing-animation {
                    display: inline-block;
                }
                .dot {
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    margin-right: 3px;
                    background: #aaa;
                    animation: typing 1.3s infinite ease-in-out;
                }
                .dot:nth-child(1) { animation-delay: 0s; }
                .dot:nth-child(2) { animation-delay: 0.2s; }
                .dot:nth-child(3) { animation-delay: 0.4s; }
                
                @keyframes typing {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-5px); }
                }
            `}</style>
        </div>
    );
};

export default RealisticSocketComponent;