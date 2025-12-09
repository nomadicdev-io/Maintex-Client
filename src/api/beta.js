import ky from "ky";

class APIManager {
    constructor(options = {}) {
        this.config = {
            url: options.url || import.meta.env.VITE_API_URL,
            ...options
        };
        this.api = ky.create({
            prefixUrl: this.config.url,
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
        this.status = false;
        this.test();
    }

    async test () {
       const res = await this.api.get('status').json();

       if(res.error){
        this.status = false;
        return console.error('API Manager Error', res?.error?.message || res?.error?.data || res?.error || 'Unknown error');
       }
       
       this.status = true;
       return true
    }
}

export default APIManager;