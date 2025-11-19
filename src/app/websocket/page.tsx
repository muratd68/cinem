'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Wifi, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function WebSocketCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-600">
              <Wifi className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">WebSocket Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Real-time communication</p>
            </div>
          </div>
          <PDFDownload title="WebSocket" sheetId="websocket" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Client (Browser)</h2>

          <CodeBlock
            language="javascript"
            title="Temel Kullanım"
            code={`// WebSocket bağlantısı
const ws = new WebSocket('ws://localhost:8080');
const wss = new WebSocket('wss://example.com/socket'); // Secure

// Event handlers
ws.onopen = (event) => {
  console.log('Connected to server');
  ws.send('Hello Server!');
};

ws.onmessage = (event) => {
  console.log('Message from server:', event.data);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = (event) => {
  console.log('Connection closed', event.code, event.reason);
};

// Send data
ws.send('text message');
ws.send(JSON.stringify({ type: 'chat', message: 'Hello' }));

// Send binary
const buffer = new ArrayBuffer(8);
ws.send(buffer);

const blob = new Blob(['Hello'], { type: 'text/plain' });
ws.send(blob);

// Close connection
ws.close();
ws.close(1000, 'Normal closure');

// Connection state
console.log(ws.readyState);
// 0 - CONNECTING
// 1 - OPEN
// 2 - CLOSING
// 3 - CLOSED`}
          />

          <CodeBlock
            language="javascript"
            title="Reconnection Logic"
            code={`class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectInterval = 1000;
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('Connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      this.handleMessage(JSON.parse(event.data));
    };

    this.ws.onclose = (event) => {
      if (event.code !== 1000) {
        this.reconnect();
      }
    };

    this.ws.onerror = (error) => {
      console.error('Error:', error);
    };
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1);
      console.log(\`Reconnecting in \${delay}ms...\`);
      setTimeout(() => this.connect(), delay);
    } else {
      console.log('Max reconnection attempts reached');
    }
  }

  send(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  handleMessage(data) {
    console.log('Received:', data);
  }

  close() {
    this.ws.close(1000, 'Client closing');
  }
}

const client = new WebSocketClient('ws://localhost:8080');
client.connect();`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Server (Node.js)</h2>

          <CodeBlock
            language="javascript"
            title="ws Library"
            code={`const WebSocket = require('ws');

// Basic server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log('Client connected:', ip);

  // Receive message
  ws.on('message', (data) => {
    const message = data.toString();
    console.log('Received:', message);

    // Echo back
    ws.send(\`Echo: \${message}\`);
  });

  // Handle close
  ws.on('close', (code, reason) => {
    console.log('Client disconnected:', code, reason.toString());
  });

  // Handle error
  ws.on('error', (error) => {
    console.error('Error:', error);
  });

  // Send welcome message
  ws.send('Welcome to the server!');
});

// Broadcast to all clients
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Ping/Pong for connection health
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', () => {
    ws.isAlive = true;
  });
});

wss.on('close', () => {
  clearInterval(interval);
});`}
          />

          <CodeBlock
            language="javascript"
            title="Express ile Entegrasyon"
            code={`const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Express routes
app.get('/', (req, res) => {
  res.send('HTTP Server Running');
});

// WebSocket handling
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

// URL path ile ayrı endpoint'ler
const wss1 = new WebSocket.Server({ noServer: true });
const wss2 = new WebSocket.Server({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  const pathname = request.url;

  if (pathname === '/chat') {
    wss1.handleUpgrade(request, socket, head, (ws) => {
      wss1.emit('connection', ws, request);
    });
  } else if (pathname === '/notifications') {
    wss2.handleUpgrade(request, socket, head, (ws) => {
      wss2.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Socket.IO</h2>

          <CodeBlock
            language="javascript"
            title="Server"
            code={`const { Server } = require('socket.io');
const io = new Server(3000, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Listen to events
  socket.on('chat message', (msg) => {
    console.log('Message:', msg);
    // Broadcast to all
    io.emit('chat message', msg);
  });

  // Emit to specific client
  socket.emit('welcome', 'Welcome to the server!');

  // Broadcast to all except sender
  socket.broadcast.emit('user joined', socket.id);

  // Rooms
  socket.join('room1');
  io.to('room1').emit('message', 'Hello room1!');
  socket.leave('room1');

  // Acknowledgements
  socket.on('request', (data, callback) => {
    // Process data
    callback({ status: 'ok', data: 'response' });
  });

  // Disconnect
  socket.on('disconnect', (reason) => {
    console.log('Client disconnected:', reason);
  });
});

// Namespace
const adminNamespace = io.of('/admin');
adminNamespace.on('connection', (socket) => {
  console.log('Admin connected');
});`}
          />

          <CodeBlock
            language="javascript"
            title="Client"
            code={`import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// Connect
socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

// Listen to events
socket.on('chat message', (msg) => {
  console.log('Message:', msg);
});

socket.on('welcome', (msg) => {
  console.log(msg);
});

// Emit events
socket.emit('chat message', 'Hello!');

// With acknowledgement
socket.emit('request', { data: 'test' }, (response) => {
  console.log('Response:', response);
});

// Rooms
socket.emit('join room', 'room1');

// Disconnect
socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});

// Reconnection
socket.on('reconnect', (attemptNumber) => {
  console.log('Reconnected after', attemptNumber, 'attempts');
});

// Manually disconnect
socket.disconnect();

// Namespace
const adminSocket = io('http://localhost:3000/admin');`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">React Hooks</h2>

          <CodeBlock
            language="typescript"
            title="useWebSocket Hook"
            code={`import { useState, useEffect, useCallback, useRef } from 'react';

interface UseWebSocketOptions {
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  reconnect?: boolean;
  reconnectInterval?: number;
}

function useWebSocket(url: string, options: UseWebSocketOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setIsConnected(true);
      options.onOpen?.();
    };

    ws.onmessage = (event) => {
      setLastMessage(event.data);
    };

    ws.onclose = () => {
      setIsConnected(false);
      options.onClose?.();

      if (options.reconnect) {
        setTimeout(connect, options.reconnectInterval || 3000);
      }
    };

    ws.onerror = (error) => {
      options.onError?.(error);
    };

    wsRef.current = ws;
  }, [url, options]);

  useEffect(() => {
    connect();

    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback((message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    }
  }, []);

  return { isConnected, lastMessage, sendMessage };
}

// Usage
function ChatComponent() {
  const { isConnected, lastMessage, sendMessage } = useWebSocket(
    'ws://localhost:8080',
    {
      onOpen: () => console.log('Connected'),
      reconnect: true,
    }
  );

  return (
    <div>
      <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      <p>Last message: {lastMessage}</p>
      <button onClick={() => sendMessage('Hello!')}>Send</button>
    </div>
  );
}`}
          />

          <CodeBlock
            language="typescript"
            title="Socket.IO React Hook"
            code={`import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(url);

    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  return { socket, isConnected };
}

// Usage
function ChatApp() {
  const { socket, isConnected } = useSocket('http://localhost:3000');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('chat message', (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [socket]);

  const sendMessage = (msg: string) => {
    socket?.emit('chat message', msg);
  };

  return (
    <div>
      <p>{isConnected ? 'Connected' : 'Disconnected'}</p>
      {messages.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))}
    </div>
  );
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Message Protocols</h2>

          <CodeBlock
            language="javascript"
            title="JSON Protocol"
            code={`// Message types
const MessageType = {
  CHAT: 'chat',
  JOIN: 'join',
  LEAVE: 'leave',
  TYPING: 'typing',
  ERROR: 'error',
};

// Client
function sendMessage(ws, type, payload) {
  ws.send(JSON.stringify({
    type,
    payload,
    timestamp: Date.now(),
  }));
}

sendMessage(ws, MessageType.CHAT, {
  room: 'general',
  text: 'Hello everyone!',
});

// Server
ws.on('message', (data) => {
  const message = JSON.parse(data);

  switch (message.type) {
    case MessageType.CHAT:
      handleChat(message.payload);
      break;
    case MessageType.JOIN:
      handleJoin(message.payload);
      break;
    case MessageType.LEAVE:
      handleLeave(message.payload);
      break;
    default:
      console.log('Unknown message type');
  }
});`}
          />

          <CodeBlock
            language="javascript"
            title="Binary Protocol"
            code={`// Send binary data
const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);

// Write data
view.setUint8(0, 1);          // message type
view.setUint32(1, 12345);     // user id
view.setFloat32(5, 3.14);     // some value

ws.send(buffer);

// Receive binary data
ws.binaryType = 'arraybuffer';

ws.onmessage = (event) => {
  const buffer = event.data;
  const view = new DataView(buffer);

  const type = view.getUint8(0);
  const userId = view.getUint32(1);
  const value = view.getFloat32(5);

  console.log(type, userId, value);
};`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Close Codes</h2>

          <CodeBlock
            language="javascript"
            title="WebSocket Close Codes"
            code={`// Standard close codes
const CloseCodes = {
  NORMAL: 1000,           // Normal closure
  GOING_AWAY: 1001,       // Server shutting down
  PROTOCOL_ERROR: 1002,   // Protocol error
  UNSUPPORTED: 1003,      // Unsupported data
  NO_STATUS: 1005,        // No status code
  ABNORMAL: 1006,         // Abnormal closure
  INVALID_DATA: 1007,     // Invalid data
  POLICY_VIOLATION: 1008, // Policy violation
  MESSAGE_TOO_BIG: 1009,  // Message too big
  EXTENSION_ERROR: 1010,  // Extension error
  INTERNAL_ERROR: 1011,   // Internal error
  SERVICE_RESTART: 1012,  // Service restart
  TRY_AGAIN: 1013,        // Try again later
  BAD_GATEWAY: 1014,      // Bad gateway
  TLS_ERROR: 1015,        // TLS handshake error
};

// Custom close codes (4000-4999)
const CustomCodes = {
  AUTH_FAILED: 4001,
  RATE_LIMITED: 4002,
  INVALID_MESSAGE: 4003,
};

// Close with code
ws.close(CloseCodes.NORMAL, 'Session ended');

// Handle close
ws.onclose = (event) => {
  switch (event.code) {
    case CloseCodes.NORMAL:
      console.log('Normal closure');
      break;
    case CustomCodes.AUTH_FAILED:
      console.log('Authentication failed');
      break;
    default:
      console.log('Connection closed:', event.code);
  }
};`}
          />
        </section>
      </div>
    </div>
  )
}
