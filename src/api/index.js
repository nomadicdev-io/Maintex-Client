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
});

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

export { orbitAI };

export default orbit;