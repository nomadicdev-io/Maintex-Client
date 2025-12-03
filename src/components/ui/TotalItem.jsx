import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { cva } from 'class-variance-authority'
import { Hash } from 'lucide-react'

const totalItemVariants = cva(
  "relative inline-flex border border-transparent font-medium dark:font-semibold items-center justify-center gap-2 whitespace-nowrap text-[0.9rem] font-regular transition-all duration-450 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-bg-300 border !border-text/15 text-text/75",
      },
      size: {
        default: "h-10 !rounded-lg px-5 has-[>svg]:px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)


export default function TotalItem({total}) {

    const {t} = useTranslation()

    const count = useMemo(() => {
        if(total < 10) return `0${total}`
        return total
    }, [total])

  return (
    <div className={totalItemVariants({ variant: "default", size: "default" })}>
        <Hash className="text-text/75" size={14} />
        <span>{t('total')}:</span>
        <span className="font-semibold text-text">{count}</span>
    </div>
  )
}
