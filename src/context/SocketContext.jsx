import { createContext, useContext, useState, useEffect, useRef } from 'react';

// Create the context
const socketContext = createContext(undefined);

// Provider component
export const SocketProvider = ({ children, url }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);

  // Cleanup function
  const cleanup = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  // Connect function
  const connect = () => {
    cleanup(); // Ensure clean state

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);
      console.log('%cSocket Connected: ' + new Date().toISOString(), 'background: blue; text-align: center; color: #fafafa; font-weight: bold; font-size: 12px; padding:8px; border-radius: 4px 0 0 4px;');
    };

    ws.onmessage = (event) => {
      try {
        const data = event
      } catch (parseErr) {
        console.error('Failed to parse WebSocket message:', parseErr);
        setError('Invalid message format');
      }
    };

    ws.onclose = (event) => {
      setIsConnected(false);
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError('Connection error');
    };
  };

  // Send message function
  const sendMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, message not sent');
      setError('Not connected');
    }
  };

  // Initial connection on mount
  useEffect(() => {
    connect();

    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, [url]); // Reconnect if URL changes

  // Context value
  const value = {
    isConnected,
    sendMessage,
    error,
  };

  return (
    <socketContext.Provider value={value}>
      {children}
    </socketContext.Provider>
  );
};

// Custom hook to use the context
export const useSocket = () => {
    const context = useContext(socketContext);
    if (context === undefined) {
      throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};