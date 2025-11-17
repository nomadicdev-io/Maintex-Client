/**
 * Converts a Blob or File object to a base64 string
 * @param {Blob|File} blob - The blob or file to convert
 * @param {Object} options - Conversion options
 * @param {boolean} options.includeDataUrl - If true, returns full data URL (e.g., "data:image/png;base64,..."). If false, returns only base64 string. Default: false
 * @param {string} options.mimeType - Override the blob's MIME type in the data URL. If not provided, uses blob.type
 * @returns {Promise<string>} A promise that resolves to the base64 string or data URL
 * @throws {Error} If the blob is invalid or conversion fails
 * 
 * @example
 * // Convert image blob to base64 string
 * const base64 = await blobToBase64(imageBlob);
 * 
 * @example
 * // Convert PDF blob to data URL
 * const dataUrl = await blobToBase64(pdfBlob, { includeDataUrl: true });
 * 
 * @example
 * // Convert with custom MIME type
 * const dataUrl = await blobToBase64(fileBlob, { 
 *   includeDataUrl: true, 
 *   mimeType: 'image/jpeg' 
 * });
 */
export default function blobToBase64(blob, options = {}) {
    return new Promise((resolve, reject) => {
        // Validate input
        if (!blob) {
            reject(new Error('Blob is required'));
            return;
        }

        if (!(blob instanceof Blob) && !(blob instanceof File)) {
            reject(new Error('Input must be a Blob or File object'));
            return;
        }

        const { includeDataUrl = false, mimeType } = options;
        
        // Use FileReader to convert blob to base64
        const reader = new FileReader();

        reader.onloadend = () => {
            try {
                const result = reader.result;
                
                if (!result) {
                    reject(new Error('Failed to read blob'));
                    return;
                }

                if (includeDataUrl) {
                    // If result is already a data URL, return it
                    if (typeof result === 'string' && result.startsWith('data:')) {
                        // If mimeType override is provided, replace it in the data URL
                        if (mimeType) {
                            const base64Data = result.split(',')[1];
                            resolve(`data:${mimeType};base64,${base64Data}`);
                        } else {
                            resolve(result);
                        }
                    } else {
                        // Convert base64 string to data URL
                        const finalMimeType = mimeType || blob.type || 'application/octet-stream';
                        resolve(`data:${finalMimeType};base64,${result}`);
                    }
                } else {
                    // Extract only the base64 string (remove data URL prefix if present)
                    if (typeof result === 'string' && result.startsWith('data:')) {
                        const base64String = result.split(',')[1];
                        resolve(base64String);
                    } else {
                        resolve(result);
                    }
                }
            } catch (error) {
                reject(new Error(`Error processing blob: ${error.message}`));
            }
        };

        reader.onerror = () => {
            reject(new Error('Failed to read blob file'));
        };

        // Read blob as data URL (base64 encoded)
        reader.readAsDataURL(blob);
    });
}

/**
 * Convenience function to convert blob to base64 data URL
 * @param {Blob|File} blob - The blob or file to convert
 * @param {string} mimeType - Optional MIME type override
 * @returns {Promise<string>} A promise that resolves to the data URL
 */
export function blobToDataUrl(blob, mimeType) {
    return blobToBase64(blob, { includeDataUrl: true, mimeType });
}

/**
 * Convenience function to convert blob to base64 string only
 * @param {Blob|File} blob - The blob or file to convert
 * @returns {Promise<string>} A promise that resolves to the base64 string
 */
export function blobToBase64String(blob) {
    return blobToBase64(blob, { includeDataUrl: false });
}

