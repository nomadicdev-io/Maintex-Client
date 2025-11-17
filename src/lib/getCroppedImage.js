const createImage = async (url) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // Needed for cross-origin images
        image.src = url;
    });
}
    
async function getCroppedImg(imageSrc, croppedAreaPixels, rotation = 0, size) {
    try{
      if (!croppedAreaPixels) {
        throw new Error('Cropped area pixels are required');
      }


      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const rotationRad = (rotation * Math.PI) / 180;

      // Calculate the size of the rotated image
      const sin = Math.abs(Math.sin(rotationRad));
      const cos = Math.abs(Math.cos(rotationRad));
      const rotatedWidth = image.width * cos + image.height * sin;
      const rotatedHeight = image.width * sin + image.height * cos;

      // Create a canvas for the rotated image
      const rotatedCanvas = document.createElement('canvas');
      const rotatedCtx = rotatedCanvas.getContext('2d');
      rotatedCanvas.width = rotatedWidth;
      rotatedCanvas.height = rotatedHeight;

      // Rotate and draw the image on the rotated canvas
      rotatedCtx.translate(rotatedWidth / 2, rotatedHeight / 2);
      rotatedCtx.rotate(rotationRad);
      rotatedCtx.translate(-image.width / 2, -image.height / 2);
      rotatedCtx.drawImage(image, 0, 0);

      // Now crop from the rotated image
      let finalWidth = croppedAreaPixels.width;
      let finalHeight = croppedAreaPixels.height;

      // Resize if width exceeds 1920px, maintaining aspect ratio
      const maxWidth = 1920;
      if (finalWidth > maxWidth) {
        const aspectRatio = finalHeight / finalWidth;
        finalWidth = maxWidth;
        finalHeight = Math.round(maxWidth * aspectRatio);
      }

      canvas.width = finalWidth;
      canvas.height = finalHeight;

      ctx.drawImage(
        rotatedCanvas,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        finalWidth,
        finalHeight
      );

      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, 'image/png');
      });
    }catch(error){
      console.error('Error cropping image:', error);
      return null;
    }
}

export default getCroppedImg;