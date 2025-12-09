import axios from 'axios';
import ky from 'ky';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-App-Secret': import.meta.env.VITE_APP_SECRET_KEY,
        'X-App-Version': import.meta.env.VITE_APP_VERSION,
        'X-App-Device': navigator?.userAgentData?.platform || navigator?.platform,
        'X-App-Platform': 'Maintex Web',
        'X-App-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        'X-App-OS': navigator?.userAgentData?.platform || navigator?.platform,
        'Accept': 'application/json',
    },
})

const apiCollection = ky.create({
    prefixUrl: import.meta.env.VITE_API_URL,
    timeout: 10000,
    credentials: 'include',
    retry: {
        limit: 3, // retry up to 3 times
        methods: ['get', 'post', 'put', 'delete'],
        statusCodes: [408, 500, 502, 503, 504]
    },
    headers: {
        'X-App-Secret': import.meta.env.VITE_APP_SECRET_KEY,
        'X-App-Version': import.meta.env.VITE_APP_VERSION,
        'X-App-Device': navigator?.userAgentData?.platform || navigator?.platform,
        'X-App-Platform': 'Maintex Web',
        'X-App-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        'X-App-OS': navigator?.userAgentData?.platform || navigator?.platform,  
        'Accept': 'application/json',
    },
})

const apiCollectionAI = ky.create({
    prefixUrl: import.meta.env.VITE_API_AI_URL,
    timeout: 10000,
    credentials: 'include',
    retry: {
        limit: 3, // retry up to 3 times
        methods: ['get', 'post', 'put', 'delete'],
        statusCodes: [408, 500, 502, 503, 504]
    },
    headers: {
        'X-App-Secret': import.meta.env.VITE_APP_SECRET_KEY,
        'X-App-Version': import.meta.env.VITE_APP_VERSION,
        'X-App-Device': navigator?.userAgentData?.platform || navigator?.platform,
        'X-App-Platform': 'Maintex Web',
        'X-App-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        'X-App-OS': navigator?.userAgentData?.platform || navigator?.platform,
        'Accept': 'application/json',
    },
});

const errorHandler = (error) => {
    if (error.response) {
        console.log('Response Error', error.response.data);
        return error.response.data;
    } else if (error.request) {
        console.log('Request Error', error.request);
        return {
            error: true,
            status: false,
            data: null,
            ...error.request
        };

    } else {
        console.log('Error', error);
        return {
            error: true,
            status: false,
            message: error.message || 'Request configuration error',
            data: null
        };
    }
}

const orbit = {
    apiCollection,
    get: async ({url, params, options}, callback) => {
        try{
            const response = await apiCollection.get(url, { 
                searchParams: params,
                ...options
             }).json();
             if(response.error) throw response
             callback && callback.onSuccess(response);
            return response;
        }catch(error){
            callback && callback.onError(error);
            return error;
        }
    },
    post: async ({url, data, options}, callback) => {
        try{
            const response = await apiCollection.post(url, {
                json: data,
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers
                },
                ...options
            }).json();
            if(response.error) throw response
            callback && callback.onSuccess(response);
            return response;
        }catch(error){
            callback && callback.onError(error);
            return error;
        }
    },
    put: async ({url, data}, callback) => {
        try{
            const response = await apiCollection.put(url, {
                json: data,
            }).json();
            if(response.error) throw response
            callback && callback.onSuccess(response);
            return response;
        }catch(error){
            callback && callback.onError(error);
            return error;
        }
    },
    delete: async ({url}, callback) => {
        try{
            const response = await apiCollection.delete(url).json();
            if(response.error) throw response
            callback && callback.onSuccess(response);
            return response;
        }catch(error){
            callback && callback.onError(error);
            return error;
        }
    },
    upload: {
        single: async ({data}, callback) => {
            try{

                const formData = new FormData()
                formData.append('file', data.file)
                formData.append('path', data.path)
                formData.append('type', data.type)
                formData.append('bucket', data.bucket)

                const response = await apiCollection.post('upload/single', {
                    body: formData,
                    headers: {
                        // Don't set Content-Type - let browser set multipart/form-data automatically
                    }
                }).json();

                if(response.error) throw response

                callback && callback.onSuccess(response);
                return response;
            }catch(error){
                callback && callback.onError(error);
                return error;
            }
        },
        large: async (data, callback) => {
            try{
                const formData = new FormData()
                formData.append('file', data.file)
                formData.append('path', data.path)
                formData.append('type', data.type)
                formData.append('bucket', data.bucket)

                const response = await apiCollection.post('/upload/large', {
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).json();
                callback && callback.onSuccess(response);
                return response;
            }catch(error){
                callback && callback.onError(error);
                return error;
            }
        },
        static: async ({data}, callback) => {
            try{
                const response = await apiCollection.post('static/upload', {
                    body: data,
                    headers: {
                        // Don't set Content-Type - let browser set multipart/form-data automatically
                    }
                }).json();


                if(response.error) throw response

                callback && callback.onSuccess(response);
                return response;
            }catch(error){
                callback && callback.onError(error);
                return error;
            }
        },
        s3Upload: async ({data}, callback) => {
            try{

                const response = await apiCollection.post('s3/upload', {
                    body: data
                }).json();

                if(response.error) throw response

                callback && callback.onSuccess(response);
                return response;
            }catch(error){
                callback && callback.onError(error);
                return error;
            }
        },
    },
    file: {
        s3: async ({key}, callback) => {
            try{
                const response = await api.post('/s3/signed-url/', {key});
                if(response.error) throw response
                callback && callback.onSuccess(response.data);
                return response.data;
            }catch(error){
                callback && callback.onError(error);
                return error;
            }
        },
        s3SignedUrl: async ({key, bucket}, callback) => {
            try{
                const response = await apiCollection.get('s3/presigned-url', {searchParams: {key, bucket}}).json();
                if(response.error) throw response
                callback && callback.onSuccess(response?.data?.url);
                return response?.data?.url;
            }catch(error){
                callback && callback.onError(error);
                return error;
            }
        }
    }
}

const orbitAI = {
    apiCollectionAI,
    get: async ({url, params, options}, callback) => {
        try{
            const response = await apiCollectionAI.get(url, { 
                searchParams: params,
                ...options
             }).json();
             if(response.error) throw response
             callback && callback.onSuccess(response);
            return response;
        }catch(error){
            callback && callback.onError(error);
            return error;
        }
    },
    post: async ({url, data, options}, callback) => {
        try{
            const response = await apiCollectionAI.post(url, {
                json: data,
                headers: {
                    ...options?.headers
                },
                ...options
            }).json();
            if(response.error) throw response
            callback && callback.onSuccess(response);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
          
            console.log(reader);
            while (!done) {
              const { value, done: streamDone } = await reader.read();
              done = streamDone;
              if (value) {
                const chunk = decoder.decode(value, { stream: true });
                console.log('Received chunk:', chunk);
                callback && callback.onStream(chunk);
              }
            }
          
            return response;
        }catch(error){
            callback && callback.onError(error);
            return error;
        }
    },
}

export { orbitAI, activityLogger };

export default orbit;

const activityLogger = {
    subscribe: (callbacks = {}) => {
        // Convert HTTP/HTTPS URL to WebSocket URL
        const docsUrl = import.meta.env.VITE_DOCS_URL || '';
        const wsUrl = docsUrl
            .replace(/^http:/, 'ws:')
            .replace(/^https:/, 'wss:');
        
        if (!wsUrl) {
            console.error('VITE_DOCS_URL is not defined');
            callbacks.onError && callbacks.onError(new Error('WebSocket URL is not configured'));
            return null;
        }

        let ws = null;
        let reconnectAttempts = 0;
        const maxReconnectAttempts = 5;
        let reconnectTimeout = null;
        let isManualClose = false;

        const connect = () => {
            try {
                ws = new WebSocket(wsUrl);

                ws.onopen = () => {
                    reconnectAttempts = 0;
                    console.log('%cActivity Logger WebSocket Connected: ' + new Date().toISOString(), 'background: green; color: #fafafa; font-weight: bold; font-size: 12px; padding:8px; border-radius: 4px;');
                    callbacks.onConnect && callbacks.onConnect();
                };

                ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        callbacks.onMessage && callbacks.onMessage(data);
                    } catch {
                        // If parsing fails, pass raw data
                        callbacks.onMessage && callbacks.onMessage(event.data);
                    }
                };

                ws.onerror = (error) => {
                    console.error('Activity Logger WebSocket error:', error);
                    callbacks.onError && callbacks.onError(error);
                };

                ws.onclose = (event) => {
                    console.log('Activity Logger WebSocket closed:', event.code, event.reason);
                    callbacks.onClose && callbacks.onClose(event);
                    
                    // Auto-reconnect if not manually closed and haven't exceeded max attempts
                    if (!isManualClose && reconnectAttempts < maxReconnectAttempts) {
                        reconnectAttempts++;
                        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000); // Exponential backoff, max 30s
                        console.log(`Reconnecting in ${delay}ms... (attempt ${reconnectAttempts}/${maxReconnectAttempts})`);
                        reconnectTimeout = setTimeout(() => {
                            connect();
                        }, delay);
                    } else if (reconnectAttempts >= maxReconnectAttempts) {
                        console.error('Max reconnection attempts reached');
                        callbacks.onMaxReconnectAttempts && callbacks.onMaxReconnectAttempts();
                    }
                };
            } catch (error) {
                console.error('Failed to create WebSocket connection:', error);
                callbacks.onError && callbacks.onError(error);
            }
        };

        // Start connection
        connect();

        // Return unsubscribe function
        return {
            unsubscribe: () => {
                isManualClose = true;
                if (reconnectTimeout) {
                    clearTimeout(reconnectTimeout);
                    reconnectTimeout = null;
                }
                if (ws) {
                    ws.close();
                    ws = null;
                }
            },
            send: (message) => {
                if (ws && ws.readyState === WebSocket.OPEN) {
                    ws.send(typeof message === 'string' ? message : JSON.stringify(message));
                } else {
                    console.warn('Activity Logger WebSocket not connected, message not sent');
                    callbacks.onError && callbacks.onError(new Error('WebSocket not connected'));
                }
            },
            isConnected: () => {
                return ws && ws.readyState === WebSocket.OPEN;
            },
            reconnect: () => {
                isManualClose = false;
                reconnectAttempts = 0;
                if (ws) {
                    ws.close();
                }
                connect();
            }
        };
    }
}