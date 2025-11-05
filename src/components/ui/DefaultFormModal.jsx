import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export default function DefaultFormModal({title, description, children, button, submitButtonText = 'Submit', cancelButtonText = 'Cancel', classNames, handleSubmit, isLoading}) {
  
  return (
    <Dialog>
        <DialogTrigger asChild>
          {button}
        </DialogTrigger>
        <DialogContent className={cn('max-w-[35rem] min-w-[35rem] max-h-[90dvh]', classNames?.content)}>
          {
            (title || description) ? 
            <DialogHeader>
                {
                    title ? <DialogTitle>{title}</DialogTitle> : null
                }
                {
                    description ? <DialogDescription className="text-text/65">{description}</DialogDescription> : null
                }
            </DialogHeader>
            : null
          }
          {
            children ? children : null
          }
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="shade">{cancelButtonText}</Button>
            </DialogClose>
            <Button isLoading={isLoading} type="button" onClick={handleSubmit}><span>{submitButtonText}</span></Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
