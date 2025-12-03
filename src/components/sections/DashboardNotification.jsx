import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import { useAtom } from "jotai"

export default function DashboardNotification({atom}){

    const [open, setOpen] = useAtom(atom)
  
    return (
      <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
    )
  }
  