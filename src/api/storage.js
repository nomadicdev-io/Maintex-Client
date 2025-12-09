class StorageAPI {
    constructor(options = {}) {
        this.config = {
            url: options.url || import.meta.env.VITE_STORAGE_URL,
            ...options
        }
    }
}

export default StorageAPI;