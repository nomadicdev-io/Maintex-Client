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

export default function FetchError({title, description, children, classNames, error, resetErrorBoundary, context}) {

  const {t} = useTranslation()
  const canGoBack = useCanGoBack()
  const router = useRouter()

  const onBack = () => {
    if(canGoBack) {
      router.history.go(-1);
    } else {
      router.navigate({to: '/app'});
    }
  }

  return (
    <main className={cn("relative w-full flex flex-col items-center justify-center h-screen", classNames?.wrapper)}>

      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none invert-100 dark:invert-0">
        <img src="/bg-login.png" alt="Background Image" className="w-full h-full object-cover z-0 pointer-events-none grayscale-100" />
      </div>

      <div className="relative flex flex-col items-center justify-center bg-bg-100/50 dark:bg-bg-100/20 backdrop-blur-sm w-120 h-auto border border-border-600 rounded-3xl p-5 pb-8">
        <div className="relative w-70 aspect-square mb-10 h-70 opacity-60 grayscale dark:invert-0 invert-100 flex items-center mt-5 justify-center before:content-[''] before:absolute before:inset-0 before:bg-bg-100/5 dark:before:bg-bg-100 before:rounded-full before:w-full before:h-full before:backdrop-blur-sm">
          {/* <img src={'/error-data.png'} alt="Empty" className="w-full h-auto object-contain" /> */}
          <Lottie animationData={anim} className='w-full h-full grayscale opacity-60 ' loop={true}/>

        </div>

        <h2 className={cn("text-3xl font-semibold mb-1 text-center text-text", classNames?.title)}>{title ? title : t('common-page-error-title')}</h2>
        <p className={cn("text-xl mt-2 font-light text-text/75 text-center max-w-[90%]", classNames?.description)}>{description ? description : t('common-page-error-description')}</p>

        <div className="relative w-full flex items-center justify-center gap-2 mt-8">
          <Button
            variant='shade'
            onClick={onBack}
            size='lg'
          >
            {i18n.language === 'ar' ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
            <span>{t('go-back')}</span>
          </Button>
          <Button variant='default' onClick={()=> window.location.reload()} size='lg'>
            <RefreshCcw size={24} />
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
