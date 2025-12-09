import ky from 'ky';
class StorageAPI {
    constructor() {
        this.api = ky.create({
            prefixUrl: import.meta.env.VITE_STORAGE_URL,
            timeout: 10000,
            credentials: 'include',
            retry: {
                limit: 3, // retry up to 3 times
                methods: ['get', 'post', 'put', 'delete'],
                statusCodes: [408, 500, 502, 503, 504]
            },
            headers: {
                'X-App-Secret': import.meta.env.VITE_APP_STORAGE_SECRET_KEY,
                'X-App-Version': import.meta.env.VITE_APP_VERSION,
                'X-App-Device': navigator?.userAgentData?.platform || navigator?.platform,
                'X-App-Platform': 'Maintex Web',
                'X-App-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
                'X-App-OS': navigator?.userAgentData?.platform || navigator?.platform,
                'Authorization': `Bearer ${import.meta.env.VITE_APP_STORAGE_API_KEY}`,
                'Accept': 'application/json',
            },
        });
        
    }

    async staticUpload(data, callback) {
       try{

        const response = await this.api.post('api/v1/upload/static', {
            body: data,
        }).json();
        
        if(response.error) throw response

        callback?.onSuccess(response);
        return response;

       }catch(error){
        callback?.onError(error);
        return error;
       }
    }

    async s3Upload(data, callback) {
        try{
 
         const response = await this.api.post('api/v1/upload/s3', {
             body: data,
         }).json();
         
         if(response.error) throw response
 
         callback?.onSuccess(response);
         return response;
 
        }catch(error){
         callback?.onError(error?.response?.data || error?.message || error);
         return error;
        }
     }


}

export default StorageAPI;