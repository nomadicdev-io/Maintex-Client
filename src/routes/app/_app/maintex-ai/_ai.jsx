import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AnimatePresence } from 'motion/react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTheme } from 'next-themes'
import { Button } from '../../../../components/ui/button'
import { MessageCirclePlus, MessageSquarePlus } from 'lucide-react'

export const Route = createFileRoute('/app/_app/maintex-ai/_ai')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    
      <ScrollArea className="relative w-full block h-full flex-1" scrollHideDelay={300}>
        <div className="relative w-full h-full flex">
        <Outlet />
        </div>

      </ScrollArea>
  )
}

