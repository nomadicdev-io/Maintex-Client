import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SearchBar({placeholder, onKeywordSearch, className}) {

    const [search, setSearch] = useState('')
    const {t} = useTranslation()

    const onSubmit = useCallback((e) => {
        e.preventDefault()
        const value = search.trim()
        if(value === '') return
        console.log('SEARCH KEYWORD:', value)
        onKeywordSearch(value)
    }, [search, onKeywordSearch])

  return (
    <form 
    onSubmit={onSubmit}
    className={cn("relative inline-flex font-medium dark:font-semibold items-center justify-center whitespace-nowrap text-[0.9rem] font-regular transition-all duration-450 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden bg-bg border border-text/15 text-text/75 h-10 rounded-lg has-[>svg]:px-3 w-80 bg-bg-300/50", className)}>
        <input 
            type="text"
            placeholder={placeholder || t('search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full flex h-full outline-none border-none bg-transparent placeholder:text-text/30 placeholder:font-light px-3 font-regular"
        />
        <button type="submit" className="w-auto h-full aspect-square flex items-center justify-center z-10 transition-all duration-300 hover:bg-bg-100 cursor-pointer">
            <Search className="text-text/75" size={14} />
        </button>

    </form>
  )
}
