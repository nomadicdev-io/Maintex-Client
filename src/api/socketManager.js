
class SocketManager {

  constructor(options = {}) {
    this.config = {
        url: options.url || 'ws://localhost:8080/ws',
        autoReconnect: options.autoReconnect || true,
        reconnectInterval: options.reconnectInterval || 5000,
        maxReconnectAttempts: options.maxReconnectAttempts || 10,
        debug: options.debug || true,
        protocols: options.protocols || [],
        ...options
    };
    this.socket = null;
    this.isConnected = false;
    this.isConnecting = false;
    this.isError = false;
    this.reconnectAttempts = 0;
    this.reconnectTimer = null;
    this.subscriptions = new Map(); // Map<channel, Set<callbacks>>
    this.connect();
  }

  log(message, type = 'info') {
    if (!this.config.debug && type === 'debug') return;
    
    const styles = {
      info: 'background: blue; text-align: center; color: #fafafa; font-weight: bold; font-size: 12px; padding:8px; border-radius: 4px 0 0 4px;',
      error: 'background: red; text-align: center; color: #fafafa; font-weight: bold; font-size: 12px; padding:8px; border-radius: 4px 0 0 4px;',
      success: 'background: green; text-align: center; color: #fafafa; font-weight: bold; font-size: 12px; padding:8px; border-radius: 4px 0 0 4px;',
      warning: 'background: orange; text-align: center; color: #fafafa; font-weight: bold; font-size: 12px; padding:8px; border-radius: 4px 0 0 4px;',
      debug: 'background: gray; text-align: center; color: #fafafa; font-weight: bold; font-size: 12px; padding:8px; border-radius: 4px 0 0 4px;'
    };
    
    console.log(`%c${message}`, styles[type] || styles.info);
  }

  reconnect() {
    if (!this.config.autoReconnect) {
      this.log('Auto-reconnect is disabled', 'debug');
      return;
    }

    if (this.reconnectAttempts >= this.config.maxReconnectAttempts) {
      this.log(`Max reconnect attempts (${this.config.maxReconnectAttempts}) reached`, 'error');
      return;
    }

    this.reconnectAttempts++;
    this.log(`Reconnecting... Attempt ${this.reconnectAttempts}/${this.config.maxReconnectAttempts}`, 'warning');
    
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, this.config.reconnectInterval);
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    
    this.isConnected = false;
    this.isConnecting = false;
    this.log('Socket disconnected', 'info');
  }

  connect () {
    if(!this.config.url) {
      this.log('Socket Error: Socket URL is not set', 'error');
      return;
    }
    
    if(this.isConnected) {
      this.log('Socket Error: Socket is already connected', 'error');
      return;
    }
    
    // Use protocols if provided
    if (this.config.protocols && this.config.protocols.length > 0) {
      this.socket = new WebSocket(this.config.url, this.config.protocols);
      this.log(`Connecting with protocols: ${this.config.protocols.join(', ')}`, 'debug');
    } else {
      this.socket = new WebSocket(this.config.url);
    }

    if(this.socket.readyState === 0) this.isConnecting = true;

    this.socket.onopen = () => {
      this.isConnected = true;
      this.isConnecting = false;
      this.isError = false;
      this.reconnectAttempts = 0;
      this.log('Socket Connected: ' + new Date().toISOString(), 'success');
    };

    this.socket.onerror = (error) => {
      this.isError = true;
      this.isConnecting = false;
      this.isConnected = false;
      this.log(`Socket Error: ${error.message || 'Connection error'}`, 'error');
    };

    this.socket.onclose = (event) => {
      this.isConnected = false;
      this.isConnecting = false;
      
      this.log(`Socket Closed: Code ${event.code}, Reason: ${event.reason || 'No reason provided'}`, 'warning');
      
      // Attempt to reconnect if auto-reconnect is enabled
      if (this.config.autoReconnect && !event.wasClean) {
        this.reconnect();
      }
    };

    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (this.config.debug) {
          console.log('Socket message', message);
        }
        
        // Check if message has an event/channel property
        const channel = message.event || message.channel || message.type;
        if (channel && this.subscriptions.has(channel)) {
          // Get all callbacks for this channel
          const callbacks = this.subscriptions.get(channel);
          const data = message.data !== undefined ? message.data : message;
          
          // Call all subscribed callbacks for this channel
          callbacks.forEach(callback => {
            try {
              callback(data);
            } catch (error) {
              this.log(`Error in channel callback for ${channel}: ${error.message}`, 'error');
            }
          });
        }
      } catch {
        // If parsing fails, log raw data
        if (this.config.debug) {
          console.log('Socket message (raw)', event.data);
        }
      }
    };
  }

  subscribe(channel, callback) {
    if (!this.socket) {
      this.log('Cannot subscribe: Socket is not initialized', 'error');
      return () => {};
    }
    
    if (!this.subscriptions.has(channel)) {
      this.send({
        event: 'subscribe',
        data: {
          channel: channel
        }
      })
      this.subscriptions.set(channel, new Set());
    }
    
    this.subscriptions.get(channel).add(callback);
    this.log(`Subscribed to channel: ${channel}`, 'debug');
    
    // Return unsubscribe function
    return () => {
      this.unsubscribe(channel, callback);
    };
  }

  unsubscribe(channel, callback) {
    if (!this.subscriptions.has(channel)) {
      return;
    }
    
    const callbacks = this.subscriptions.get(channel);
    callbacks.delete(callback);
    
    // Clean up empty channel subscriptions
    if (callbacks.size === 0) {
      this.subscriptions.delete(channel);
    }
    
    this.log(`Unsubscribed from channel: ${channel}`, 'debug');
  }

  send(event, data) {
    this.socket.send(JSON.stringify({ event, data }));
  }

  close() {
    this.socket.close();
  }
}

export default SocketManager;
