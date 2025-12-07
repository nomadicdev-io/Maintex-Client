import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const socketContext = createContext(undefined);

export const SocketProvider = ({ children, url }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const wsRef = useRef(null);
  const messageListenersRef = useRef(new Set());
  const errorRef = useRef(null);

  // Register message listener
  const onMessage = useCallback((callback) => {
    console.log('ON MESSAGE', callback)
    messageListenersRef.current.add(callback);
    return () => {
      messageListenersRef.current.delete(callback);
    };
  }, []);

  // Connect to socket
  useEffect(() => {
    if (!url) return;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true); 
      console.log('%cSocket Connected: ' + new Date().toISOString(), 'background: blue; text-align: center; color: #fafafa; font-weight: bold; font-size: 12px; padding:8px; border-radius: 4px 0 0 4px;');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        console.log('SOCKET MESSAGE', data)
        setLastMessage(data);
        
        // Notify all listeners
        messageListenersRef.current.forEach((callback) => {
          callback(data);
        });
      } catch (err) {
        console.error('Failed to parse message:', err);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.error('Socket closed');
    };

    ws.onerror = (error) => {
      console.error('Socket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  // Send message
  const sendMessage = useCallback((message) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  const value = {
    isConnected,
    sendMessage,
    lastMessage,
    onMessage,
  };

  return (
    <>
      {children}
    </>
  );
};

export const useSocket = () => {
  const context = useContext(socketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};