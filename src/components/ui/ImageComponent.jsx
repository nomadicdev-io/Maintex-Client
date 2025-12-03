import React, { memo, useMemo } from 'react'
import { Skeleton } from './skeleton'
import { useQuery } from '@tanstack/react-query'
import orbit from '../../api'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useTheme } from 'next-themes'
import { ImageOff } from 'lucide-react';
import { getS3Image, getStaticImage } from '../../lib/getImage';
import { cn } from '@/lib/utils'

const ImageComponent = memo(({className, alt, imageKey, bucket, isStatic = false, classNames}) => {

    const {resolvedTheme} = useTheme()

    const image = useMemo(() => {
        if (isStatic) {
            return getStaticImage(imageKey)
        }else{
            return getS3Image(imageKey, bucket)
        }
    }, [imageKey, bucket, isStatic])
    
    return (
        <div className={`relative w-full h-full ${className}`}>
            <LazyLoadImage
            alt={alt}
                height={'100%'}
                src={image} 
                width={'100%'} 
                className={cn('w-full h-full object-cover', classNames?.image)}
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