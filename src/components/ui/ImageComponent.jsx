import React, { memo } from 'react'
import { Skeleton } from './skeleton'
import { useQuery } from '@tanstack/react-query'
import orbit from '../../api'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useTheme } from 'next-themes'
import { ImageOff } from 'lucide-react';
import { getS3Image } from '../../lib/getImage';

const ImageComponent = memo(({className, alt, imageKey, bucket}) => {

    const {resolvedTheme} = useTheme()
    const image = getS3Image(imageKey, bucket)
    
    return (
        <div className={`relative w-full h-full ${className}`}>
            <LazyLoadImage
                alt={alt}
                height={'100%'}
                src={image} 
                width={'100%'} 
                className='w-full h-full object-cover'
                wrapperClassName={'w-full h-full object-cover'}
                effect={'blur'}
                wrapperProps={{
                    style: {transitionDelay: "0.2s"},
                }}
                placeholderSrc={resolvedTheme === 'dark' ? '/placeholder-dark.png' : '/placeholder-light.png'}
            />
        </div>
    )
})

export default ImageComponent