
import { ChevronLeft, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { Link, useLocation, useRouter } from "@tanstack/react-router"
import { Activity, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { HashLoader } from "react-spinners"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@components/ui/tooltip"
import { sidebarNav } from "@store/nav"
import { cn } from "../../lib/utils"
import { IoMdLogOut } from "react-icons/io"
import { useSetAtom } from "jotai"
import { notificationSheetAtom } from "@/components/layouts/AdminHeader"
import useSidebar from "@/hooks/useSidebar"
import { useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "@/hooks/useAuthStore"
import { useTheme } from "next-themes"
import { authClient } from "@/auth"

export default function AdminSidebar() {

    const { isOpen } = useSidebar()
    const {data} = authClient.useSession()

    return (
        <>
        <Activity mode={isOpen ? 'visible' : 'hidden'}>
            <MegaSidebar user={data?.user}/>
        </Activity>
        <Activity mode={isOpen ? 'hidden' : 'visible'}>
            <MiniSidebar user={data?.user}/>
        </Activity>
        </>
    )
}

function MegaSidebar({ user }){

    const {toggle} = useSidebar(false)

    return (
        <div className="w-[18.5rem] h-screen dark:bg-bg-300 bg-white border-e border-border relative flex flex-col">
            <SidebarLogo onToggleSidebar={toggle} />
            <SidebarNav user={user} />
            <SidebarSignOut />
            
        </div>
    )
}

function MiniSidebar({ user }){

    const {resolvedTheme} = useTheme()
    return (
        <div className="w-15 h-screen dark:bg-bg-300 bg-white border-e border-border relative flex flex-col">
            <div className="flex items-center justify-between w-full h-[4rem] border-b border-border aspect-square relative p-2">
                <Link to="/admin" className="block w-full flex-1 h-auto aspect-square relative rounded-xl overflow-hidden border border-slate-200">
                    <img src={resolvedTheme === 'dark' ? '/icon-dark.svg' : '/icon-light.svg'} alt="Maintex Pro" className="object-contain object-center w-full h-[80%]" />
                </Link>
            </div>

            <MiniSidebarNav user={user} />

            <MiniSidebarSignOut />
        </div>
    )
}

function SidebarLogo({ onToggleSidebar }){

    const {resolvedTheme} = useTheme()
    
    return (    
        <div className="flex items-center justify-between w-full h-[4rem] relative px-3 border-b border-border">
            <Link to="/app" className="w-full flex-1 h-[40%] relative flex items-center justify-start gap-2">
                <div className="relative overflow-hidden h-full w-auto  rounded-md">
                <img src={resolvedTheme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'} alt="Maintex Pro" className="object-contain object-left w-auto h-full" />
                </div>
            </Link>

            <Button onClick={onToggleSidebar} size="icon" className="size-9" variant="shade">
            <ChevronLeft size={22} />
            </Button>
        </div>
    )
}

function SidebarNav({ user }){


    return (
        <div className="relative flex-1 w-full h-full py-4 overflow-y-scroll scrollbar-hide">
            <nav className="relative flex flex-col">
                {
                    sidebarNav?.map((item, index) => (
                        (item?.role?.includes(user?.role)) ?
                        <div key={`sidebar-nav-${index}`} className={`relative w-full h-auto border-b border-border pb-4 px-4 [&:last-child]:border-b-0 ${index !== sidebarNav?.length - 1 ? 'mb-4' : ''}`}>
                            <h3 className={`text-sm px-2 font-normal dark:text-text/75 text-slate-500/75 mb-2`}>{item.label}</h3>
                            <div className="relative flex flex-col gap-2">
                                {
                                    item?.items?.map((item) => (
                                      (item.users === user?.role ) ?(
                                        <SidebarNavItem key={item.id} item={item} index={index}/>
                                      )
                                      :
                                        <SidebarNavItem key={item.id} item={item} index={index}/>
                                      
                                    ))
                                }
                            </div>
                        </div>
                        :
                        null
                    ))
                }
            </nav>
        </div>
    )
}

function SidebarNavItem({ item }){

    const setNotificationSheet = useSetAtom(notificationSheetAtom)
    const location = useLocation()
    const navItemRef = useRef(null)

    useEffect(() => {
        if(location.pathname === item.href){
            setTimeout(() => {
                navItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 150)
        }
    }, [location?.pathname])

    return (
        <>
        {
            item.href === '/app/notifications' ?
            <div ref={navItemRef} id={item.id} onClick={() => setNotificationSheet(true)} className={cn(
                "relative w-full h-auto flex gap-2 items-center px-3 py-2 rounded-lg transition-all duration-200 [&_svg]:size-5 cursor-pointer",
                "dark:hover:bg-text/10 hover:bg-slate-50 hover:text-text/90 dark:text-text/50 text-text/70 [&_svg]:text-text/60 hover:[&_svg]:text-primary dark:[&.active]:bg-gradient-to-br dark:from-text/20 dark:to-text/30 [&.active]:bg-gradient-to-br from-text to-text/80 dark:[&.active]:text-text [&.active]:text-bg dark:[&.active]:[&_svg]:text-text [&.active]:[&_svg]:text-bg [&.active]:opacity-100"
            )}>
                {item.icon}
                <span className="font-medium">{item.label}</span>
            </div>
            :
            <Link ref={navItemRef} id={item.id} search={item.search} activeOptions={{exact:item.exact}} to={item.href === '/app/notifications' ? '?' : item.href} target={item.external ? '_blank' : '_self'} className={cn(
                "relative w-full h-auto flex gap-2 items-center px-3 py-2 rounded-lg transition-all duration-200 [&_svg]:size-5",
                "dark:hover:bg-text/10 hover:bg-slate-50 hover:text-text/90 dark:text-text/50 text-text/70 [&_svg]:text-text/60 hover:[&_svg]:text-primary dark:[&.active]:bg-gradient-to-br dark:from-text/20 dark:to-text/30 [&.active]:bg-gradient-to-br from-text to-text/80 dark:[&.active]:text-text [&.active]:text-bg dark:[&.active]:[&_svg]:text-text [&.active]:[&_svg]:text-bg [&.active]:opacity-100"
            )}>
                {item.icon}
                <span className="font-medium">{item.label}</span>
            </Link>
        }
        </>
     
    )
}

function MiniSidebarNav({ user }){


    return (
        <div className="relative flex-1 w-full h-full py-3 overflow-y-scroll scrollbar-hide">
            <nav className="relative flex flex-col">
                {
                    sidebarNav?.map((item, index) => (
                        <div key={`sidebar-nav-${index}`} className="relative w-full h-auto border-b border-border mb-3 pb-3 px-3 [&:last-child]:border-b-0">
                            <div className="relative flex flex-col gap-2">
                                {
                                    item?.items?.map((item) => (
                                        (item.users === user?.role ) ?
                                        <MiniSidebarNavItem key={item.id} item={item} index={index} />
                                        :
                                        <MiniSidebarNavItem key={item.id} item={item} index={index} />
                                        )
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </nav>
        </div>
    )
}

function MiniSidebarNavItem({ item, index }){

    const setNotificationSheet = useSetAtom(notificationSheetAtom)
    const location = useLocation()
    const navItemRef = useRef(null)

    useEffect(() => {
        if(location.pathname === item.href){
            setTimeout(() => {
                navItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 150)
        }
    }, [location?.pathname])

    return (
        <Tooltip variant="secondary">
            <TooltipTrigger>
                {
                    item.href === '/dashboard/notifications' ?
                    <div ref={navItemRef} onClick={() => setNotificationSheet(true)} className={cn(
                        "relative w-full h-auto aspect-square flex gap-2 items-center justify-center rounded-lg transition-all duration-200 [&_svg]:w-5 [&_svg]:h-5",
                        "hover:bg-primary/10 hover:text-text/90 text-text/70 [&_svg]:text-text/60 hover:[&_svg]:text-primary dark:[&.active]:bg-gradient-to-br dark:from-text/20 dark:to-text/30 [&.active]:bg-gradient-to-br from-text to-text/80 dark:[&.active]:text-text [&.active]:text-bg dark:[&.active]:[&_svg]:text-text [&.active]:[&_svg]:text-bg [&.active]:opacity-100"
                    )}>
                        {item.icon}
                    </div>
                    :
                    <Link ref={navItemRef} activeOptions={{exact: index === 0 ? true : false}} to={item.href} className={cn(
                        "relative w-full h-auto aspect-square flex gap-2 items-center justify-center rounded-lg transition-all duration-200 [&_svg]:w-5 [&_svg]:h-5",
                        "hover:bg-primary/10 hover:text-text/90 text-text/70 [&_svg]:text-text/60 hover:[&_svg]:text-primary dark:[&.active]:bg-gradient-to-br dark:from-text/20 dark:to-text/30 [&.active]:bg-gradient-to-br from-text to-text/80 dark:[&.active]:text-text [&.active]:text-bg dark:[&.active]:[&_svg]:text-text [&.active]:[&_svg]:text-bg [&.active]:opacity-100"
                    )}>
                        {item.icon}
                    </Link>
                }
            </TooltipTrigger>
            <TooltipContent side="right">
                {item.label}
            </TooltipContent>
        </Tooltip>
       
    )
}

function SidebarSignOut(){

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const queryClient = useQueryClient()
    const logout = useAuthStore((state) => state.logout)

    const handleSignOut = async() => {
        setIsLoading(true)
        try{

            await logout()
            router.invalidate()
            router.navigate({to: '/auth/login', replace: true})
            queryClient.clear()
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="relative w-full h-12  border-t border-border">
            <button onClick={handleSignOut} title="Sign Out" aria-label="Sign Out" className="flex items-center gap-3 w-full h-full cursor-pointer text-text/70 px-8 hover:bg-text/20 transition-all [&_svg]:w-5 [&_svg]:h-5 duration-300 [&_svg]:text-text/60 hover:!text-text hover:[&_svg]:text-text">
                <IoMdLogOut className="size-4" />
                <span className="text-sm font-medium">Sign Out</span>
                {
                    isLoading && <HashLoader size={20} color="#EF4852" />
                }
            </button>
        </div>
    )
}

function MiniSidebarSignOut(){

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const queryClient = useQueryClient()
    const logout = useAuthStore((state) => state.logout)

    const handleSignOut = async() => {
        setIsLoading(true)
        try{

            await logout()
            router.invalidate()
            router.navigate({to: '/auth/login', replace: true})
            queryClient.clear()

        }catch(error){
            console.log(error)
            toast.error(error.message)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <Tooltip variant="secondary">
            <TooltipTrigger disabled={isLoading} onClick={handleSignOut}>
                <div className="relative w-full h-12  border-t border-border">
                    <span  title="Sign Out" aria-label="Sign Out" className="flex items-center  gap-3 w-full h-full cursor-pointer px-5 hover:bg-text/20 hover:text-text transition-all duration-300 text-text/60">                
                        {
                            isLoading ? <HashLoader size={20} color="#EF4852" /> : <IoMdLogOut className="size-5 " />
                        }
                    </span>
                </div>
            </TooltipTrigger>
            <TooltipContent side="right">
                Sign Out
            </TooltipContent>
        </Tooltip>
        
    )
}