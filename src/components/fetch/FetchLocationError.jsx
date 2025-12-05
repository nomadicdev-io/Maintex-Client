import {  useRouter } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import Lottie from 'lottie-react'
import anim from '@animations/location-anim.json'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { LocationEdit } from 'lucide-react'

export default function FetchLocationError({children, classNames}) {

  const {t} = useTranslation()
  const router = useRouter()

  const onPermissionRequest = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        router.navigate({to: '/app'});
      },
      () => {
        router.navigate({to: '/location-error'});
      }
    )
  }

  return (
    <main className={cn("relative w-full flex flex-col items-center justify-center h-screen", classNames?.wrapper)}>

    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none invert-100 dark:invert-0 opacity-50">
      <img src="/bg-ambient.jpg" alt="Background Image" className="w-full h-full object-cover z-0 pointer-events-none grayscale-100" />
    </div>

    <div className="relative flex flex-col items-center justify-center w-190 h-auto rounded-3xl p-5 pb-8">
      <div className="relative w-70 aspect-square mb-10 h-70 flex items-center mt-5 justify-center scale-140">
        {/* <img src={'/error-data.png'} alt="Empty" className="w-full h-auto object-contain" /> */}
        <Lottie animationData={anim} className='w-full h-full grayscale ' loop={true}/>

      </div>

      <h2 className={cn("text-4xl font-semibold mb-2 text-center text-text", classNames?.title)}>
        {t('location-access-required')}
      </h2>
      <p className={cn("text-xl mt-2 font-light text-text/75 leading-[1.75] text-center ", classNames?.description)}>
        {t('location-access-required-description')}
      </p>
    </div>

    <div className="relative w-full flex items-center justify-center gap-2 mt-4">
        <Button variant='default' onClick={onPermissionRequest} size='xl'>
            <LocationEdit size={26} />
            <span>{t('enable-location')}</span>
        </Button>
    </div>

    <div className="absolute top-0 right-0 rtl:left-0 rtl:right-auto p-5 flex items-center justify-center gap-2">
        <ThemeSwitcher classNames={'relative p-0'} />
    </div>

    {
      children ? children : null
    }
  </main>
  )
}
