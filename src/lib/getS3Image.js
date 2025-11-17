export const getS3Image = (key, bucket) => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/s3/url?key=${key}&bucket=${bucket}`
    return url
}
