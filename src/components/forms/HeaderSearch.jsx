import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Search } from 'lucide-react'

export default function HeaderSearch(){

    return (
      <Dialog>
        <DialogTrigger asChild>
        <button type="button" className="flex items-center gap-2 relative cursor-pointer group" title="Search">
          <div className="relative min-w-[17.5rem] h-10 border border-border-600 pe-9 rounded-lg flex items-center px-3 transition-all duration-300 group-hover:border-text/35">
            <span className="text-sm text-text/30">Search...</span>
          </div>
          <div className="absolute right-0 top-0 h-full aspect-square flex items-center justify-center z-10">
            <Search size={20} className="text-text/30" />
          </div>
        </button>
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="max-w-[27.5rem] min-w-[27.5rem]">
            <div className="relative w-full flex items-center justify-center gap-3 p-5">
  
            </div>
        </DialogContent>
        </Dialog>
    )
  }
  