import { useState, useEffect, useRef } from 'react';

export const useWebSocketChannel = (url, channel, options = {}) => {
    const {
      reconnect = true,
      reconnectInterval = 3000,
      reconnectAttempts = 5,
      onMessage = null,
      onError = null,
      onConnect = null,
    } = options;
  
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState(null);
    const [error, setError] = useState(null);
    
    const wsRef = useRef(null);
    const reconnectCountRef = useRef(0);
    const reconnectTimeoutRef = useRef(null);
  
    const connect = () => {
      try {
        const ws = new WebSocket(url);
        wsRef.current = ws;
  
        ws.onopen = () => {
          console.log(`Connected to WebSocket: ${url}`);
          setIsConnected(true);
          setError(null);
          reconnectCountRef.current = 0;
  
          // Subscribe to the channel
          ws.send(JSON.stringify({
            action: 'subscribe',
            channel: channel
          }));
  
          if (onConnect) onConnect();
        };
  
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setLastMessage(data);
            if (onMessage) onMessage(data);
          } catch (err) {
            console.error('Failed to parse message:', err);
            setLastMessage(event.data);
            if (onMessage) onMessage(event.data);
          }
        };
  
        ws.onerror = (event) => {
          const errMsg = 'WebSocket error occurred';
          console.error(errMsg, event);
          setError(errMsg);
          if (onError) onError(event);
        };
  
        ws.onclose = (event) => {
          console.log('WebSocket disconnected:', event.code, event.reason);
          setIsConnected(false);
          wsRef.current = null;
  
          // Attempt reconnection
          if (reconnect && reconnectCountRef.current < reconnectAttempts) {
            reconnectCountRef.current += 1;
            console.log(`Reconnecting... Attempt ${reconnectCountRef.current}`);
            
            reconnectTimeoutRef.current = setTimeout(() => {
              connect();
            }, reconnectInterval);
          }
        };
      } catch (err) {
        console.error('Failed to create WebSocket connection:', err);
        setError(err.message);
      }
    };
  
    const disconnect = () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (wsRef.current) {
        // Unsubscribe before closing
        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            action: 'unsubscribe',
            channel: channel
          }));
        }
        wsRef.current.close();
        wsRef.current = null;
      }
      
      setIsConnected(false);
    };
  
    const sendMessage = (message) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        const payload = JSON.stringify({
          channel: channel,
          message: message
        });
        wsRef.current.send(payload);
        return true;
      }
      console.warn('WebSocket is not connected');
      return false;
    };
  
    useEffect(() => {
      connect();
  
      return () => {
        disconnect();
      };
    }, [url, channel]);
  
    return {
      isConnected,
      lastMessage,
      error,
      sendMessage,
      disconnect,
      reconnect: connect
    };
};