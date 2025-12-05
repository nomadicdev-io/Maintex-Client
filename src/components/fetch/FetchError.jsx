import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"
import { Button } from "../ui/button"
import { ArrowLeft, ArrowRight, CircleX, RefreshCcw } from "lucide-react"
import ThemeSwitcher from "../ui/ThemeSwitcher"
import LanguageSwitcher from "../ui/LanguageSwticher"
import anim from '@animations/server-anim.json'
import Lottie from "lottie-react"
import { useCanGoBack, useRouter } from "@tanstack/react-router"
import i18n from "../../lang"
import { useMemo } from "react"

export default function FetchError({title, description, children, classNames, error, resetErrorBoundary, context}) {

  const {t} = useTranslation()
  const canGoBack = useCanGoBack()
  const router = useRouter()
  const message = useMemo(()=> {
    return error?.data?.message || error?.message || error?.statusText || error?.status || error?.data?.error || error?.data?.errors || error?.data?.error?.message || error?.data?.error?.errors || error?.data?.error?.statusText || error?.data?.error?.status
  }, [error])

  const onBack = () => {
    if(canGoBack) {
      router.history.go(-1);
    } else {
      router.navigate({to: '/app'});
    }
  }

  return (
    <main className={cn("relative w-full flex flex-col items-center justify-center h-screen", classNames?.wrapper)}>

    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none invert-100 dark:invert-0 opacity-50">
      <img src="/bg-ambient.jpg" alt="Background Image" className="w-full h-full object-cover z-0 pointer-events-none grayscale-100" />
    </div>
      <div className="relative flex flex-col items-center justify-center ">
        <div className="relative w-70 aspect-square mb-10 h-70 opacity-60 grayscale dark:invert-0  overflow-hidden rounded-full flex items-center mt-5 justify-center before:content-[''] before:absolute before:inset-0 before:bg-text/10 dark:before:bg-text/7 backdrop-blur-lg before:rounded-full before:w-full before:h-full before:backdrop-blur-sm">
          {/* <img src={'/error-data.png'} alt="Empty" className="w-full h-auto object-contain" /> */}
          <Lottie animationData={anim} className='w-[90%] h-full grayscale opacity-80 ' loop={true}/>

        </div>

        <h2 className={cn("text-4xl font-semibold mb-2 text-center text-text", classNames?.title)}>{title ? title : t('common-page-error-title')}</h2>
        <p className={cn("text-xl mt-2 font-light text-text/75 text-center max-w-[90%]", classNames?.description)}>{message || description || t('common-page-error-description')}</p>

        <div className="relative w-full flex items-center justify-center gap-3 mt-8">
          <Button
            variant='shade'
            onClick={onBack}
            size='xl'
          >
            {i18n.language === 'ar' ? <ArrowRight size={24} /> : <ArrowLeft size={26} />}
            <span>{t('go-back')}</span>
          </Button>
          <Button variant='default' onClick={()=> window.location.reload()} size='xl'>
            <RefreshCcw size={26} />
            <span>{t('refresh')}</span>
          </Button>
          
        </div>
      </div>

      <div className="absolute top-0 right-0 rtl:left-0 rtl:right-auto p-5 flex items-center justify-center gap-2">
      <ThemeSwitcher classNames={'relative p-0'} />
      {
        context?.lang ? <LanguageSwitcher data={context?.lang}/> : null
      }
      </div>

      {
        children ? children : null
      }
    </main>
  )
}
