import useSidebar from "@/hooks/useSidebar"
import { Button } from "../ui/button"
import { AlignLeft, AudioLines, BellRing, Bot, CalendarDays, CalendarDaysIcon, FolderKanban, Globe, LogOut, MessagesSquare, Megaphone, Moon, Settings, Sun, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarLoader } from "react-spinners";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip"
import { atom, useSetAtom } from "jotai";
import { RxCaretSort } from "react-icons/rx";
import { useRouter } from "@tanstack/react-router";
import { authClient } from "@/auth";
import { useTheme } from "next-themes";
import { useAuthStore } from "../../hooks/useAuthStore";
import ImageComponent from "../ui/ImageComponent";
import useAI from "@/hooks/useAI";
import { voiceAgentAtom } from "../../routes/app/_app";
import HeaderSearch from "../forms/HeaderSearch";
import dayjs from "dayjs";
import { useCallback } from "react";
import DashboardNotification from "../sections/DashboardNotification";
import LanguageSwitcher from "../ui/LanguageSwticher";

export const notificationSheetAtom = atom(false)

export default function AdminHeader() {

  const {data: session} = authClient.useSession()
  const { isOpen, toggle } = useSidebar()

  return (
    <>
    <header className="relative w-full h-[4rem] min-h-[4rem] max-h-[4rem] border-b border-border ps-5 flex flex-col">
      <div className="flex items-center justify-between w-full h-full">
        <div className="flex items-center gap-2">
          {
            !isOpen ?
            <Button onClick={toggle} size="icon"  variant="shade">
              <AlignLeft />
            </Button>
            :
            null
          }
          <LanguageSwitcher />
          <HeaderDocumentGenerator />
          <HeaderSearch isIcon={true} />

        </div>

        <div className="flex items-center gap-4 h-full">

          <div className="flex items-center gap-2">
            {/* <HeaderSchedules /> */}
            <HeaderAIChatBot />
            {
              (session?.user?.role === 'admin' || session?.user?.role === 'superadmin') ?
              <HeaderSettings />
              :
              null
            }
            <HeaderVoiceAgent />
            <HeaderChat />
            <HearThemeSwitcher />
            <HeaderNotifications />
            <HeaderDate />

          </div>

          <HeaderUser />
        </div>
      </div>
    </header>
    <DashboardNotification atom={notificationSheetAtom} />
    </>
  )
}

function HeaderChat(){

  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
    <Tooltip variant="secondary">
      <TooltipTrigger asChild>
        <Button onClick={()=> router.navigate({to: '/app/chats'})} size="icon" variant="defaultIcon" >
          <MessagesSquare />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Chats</TooltipContent>
    </Tooltip>
    </div>
  )
}

function HeaderVoiceAgent(){


  const setVoiceAgent = useSetAtom(voiceAgentAtom)

  return (
    <div className="flex items-center gap-2">
    <Tooltip variant="secondary">
      <TooltipTrigger asChild>
        <Button onClick={()=> setVoiceAgent(e=> !e)} size="icon" variant="defaultIcon" >
          <AudioLines />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Voice Agent</TooltipContent>
    </Tooltip>
    </div>
  )
}

function HeaderNotifications(){

  const setNotificationSheet = useSetAtom(notificationSheetAtom)

  return (
    <div className="flex items-center gap-2">
     <Tooltip variant="secondary">
        <TooltipTrigger asChild>
          <Button onClick={()=> setNotificationSheet(true)} size="icon" variant="defaultIcon">
          <BellRing/>
          <span className="absolute top-1 right-1 w-[10px] h-[10px] bg-red-600 rounded-full"></span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Notifications</TooltipContent>
     </Tooltip>
    </div>
  )
}

function HeaderDate(){
  return (
    <div className="relative flex items-center gap-2 h-10 border border-border-600 text-text/80 rounded-lg px-3 ">
      <CalendarDaysIcon size={16} />
      <span className="text-sm">{dayjs().format('DD MMM YYYY')}</span>
    </div>
  )
}

function HeaderSettings(){

  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
    <Button onClick={()=> router.navigate({to: '/app/admin/settings'})} size="icon" variant="defaultIcon">
      <Settings/>
    </Button>
    </div>
  )
}

function HearThemeSwitcher(){

  const {resolvedTheme, setTheme} = useTheme()

  const onThemeSwitch = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="flex items-center gap-2">
    <Tooltip variant="secondary">
      <TooltipTrigger asChild>
          <Button onClick={onThemeSwitch} size="icon" variant="defaultIcon">
          {
            resolvedTheme === 'dark' ? 
            <Sun/>
            :
            <Moon/>
          }
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</TooltipContent>
    </Tooltip>
    </div>
  )
}

function HeaderSchedules(){

  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
    <Button onClick={()=> router.navigate({to: '/admin/schedules'})} size="icon" variant="defaultIcon">
      <CalendarDays className="text-text" />
    </Button>
    </div>
  )
}

function HeaderUser(){

  const router = useRouter()
  const setNotificationSheet = useSetAtom(notificationSheetAtom)
  const {data: session} = authClient.useSession()
  const {resolvedTheme} = useTheme()
  const {logout, isLogouting} = useAuthStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 h-full min-w-45 max-w-75 border-s border-border px-3 cursor-pointer transition-all duration-300 hover:bg-text/3 group">
            <div className="relative w-9 h-9 inline-flex rounded-full overflow-hidden">
            {
              session?.user?.image?.key ?
              <ImageComponent imageKey={session?.user?.image?.key} bucket={session?.user?.image?.bucket} alt="Profile Avatar" className="w-full h-full object-cover" />
              :
              <img src={resolvedTheme === 'dark' ? '/user-avatar-dark.png' : '/user-avatar-light.png'} alt="Profile Avatar" className="w-full h-full object-cover" />
            }
            </div>
          <div className="flex flex-col flex-1">
            <p className="text-sm font-semibold leading-4 max-w-[10rem] truncate w-full">{session?.user?.name}</p>
            <p className="text-xs font-medium text-gray-500 capitalize mt-1">{session?.user?.role}</p>
          </div>
          <RxCaretSort size={24} className="text-gray-700 ms-1 group-hover:text-primary"/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-55" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem key="/app/account/projects" onSelect={()=> router.navigate({to: '/app/account/projects'})}>
            <FolderKanban className="w-2 h-2" />
              Projects
          </DropdownMenuItem>
          <DropdownMenuItem key="/app/announcements" onSelect={()=> router.navigate({to: '/app/announcements'})}>
            <Megaphone className="w-2 h-2" />
              Announcements
          </DropdownMenuItem>
          <DropdownMenuItem key="/app/notifications" onSelect={()=> {
            setNotificationSheet(true)
          }}>
            <BellRing className="w-2 h-2" />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem key="/app/chats" onSelect={()=> router.navigate({to: '/app/chats'})}>
            <MessagesSquare className="w-2 h-2" />
            Chats
          </DropdownMenuItem>
          <DropdownMenuItem key="/app/account/profile" onSelect={()=> router.navigate({to: '/app/account/profile'})}>
            <User2 className="w-2 h-2" />
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem key="logout" onSelect={logout}>
          {
            isLogouting ? 
            <BarLoader height={3} width={'100%'} color="#EF4852" />
            :
            <>
             <LogOut className="w-2 h-2 !text-red-300" />
             Sign Out
             </>
          }
         
          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

function HeaderAIChatBot(){

  // const {toggle} = useAI()
  const router = useRouter()

  const handleAIChatBot = () => {
    router.navigate({to: '/app/maintex-ai'})
  }

  return (
    <Button size="icon" variant="defaultIcon" onClick={handleAIChatBot}>
      <Bot/>
    </Button>
  )

  // return (
  //   <Tooltip variant="secondary">
  //     <TooltipTrigger asChild>
  //       <Button size="icon" variant="defaultIcon" onClick={toggle}>
  //         <Bot/>
  //       </Button>
  //     </TooltipTrigger>
  //     <TooltipContent side="bottom">
  //       Maintex AI
  //     </TooltipContent>
  //   </Tooltip>
  // )
}

function HeaderDocumentGenerator(){

  const handleDocumentGenerator = useCallback(()=> {
    window.open('https://app.documentsnina.cloud/', '_blank')
  }, [])
  return (
    <Button variant="shade" aria-label="Nina Generate Document" title="Nina Generate Document" type="button" onClick={handleDocumentGenerator}>
      <img src="/nina-icon.svg" alt="Nina Logo" className="size-4 me-1 dark:invert-100" /> <span>Document Generator</span>
    </Button>
  )
}
