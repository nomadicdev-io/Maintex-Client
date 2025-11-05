import React, { memo } from 'react'
import { Skeleton } from './skeleton'
import { useQuery } from '@tanstack/react-query'
import orbit from '../../api'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useTheme } from 'next-themes'
import { ImageOff } from 'lucide-react';

const ImageComponent = memo(({className, alt, src, bucket}) => {

    const {resolvedTheme} = useTheme()

    const {data, isLoading, isError} = useQuery({
        queryKey: ['image', src],
        enabled: true,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        queryFn: async () => {
            try{
                if(!src) return ''

                let url = ''

                if(bucket){
                    await orbit.file.s3SignedUrl({key: src, bucket}, {
                        onSuccess: (data) => {
                            url = data
                            console.log(data)
                        },
                        onError: (error) => {
                            console.log(error)
                            url = ''
                        }
                    })
                }else{
                    await orbit.file.s3({key: src}, {
                        onSuccess: (data) => {
                            url = data
                        },
                        onError: (error) => {
                            console.log(error)
                            url = ''
                        }
                    })
                }
                console.log(url)
                return url
            }catch(error){
                console.log(error)
                return null
            }
        }
    })
  return (
    <div className={`relative w-full h-full ${className}`}>
       {
        isLoading ?
        <Skeleton className={`w-full h-full relative block`} />
        :
        isError ?
        <div className='w-full h-full flex items-center justify-center'>
            <ImageOff size={44} className='opacity-20' />
        </div>
        :
        <LazyLoadImage
            alt={alt}
            height={'100%'}
            src={data} 
            width={'100%'} 
            className='w-full h-full object-cover'
            wrapperClassName={'w-full h-full object-cover'}
            effect={'blur'}
            wrapperProps={{
                style: {transitionDelay: "0.2s"},
            }}
            placeholderSrc={resolvedTheme === 'dark' ? '/placeholder-dark.png' : '/placeholder-light.png'}
        />
       }
    </div>
  )
})

export default ImageComponent