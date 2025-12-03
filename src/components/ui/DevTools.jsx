import { GitBranch, Route } from "lucide-react";
import { Button } from "./button";
import { useCallback, useState } from "react";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useHotkeys } from 'react-hotkeys-hook'

export default function DevTools() {

    const [isRouterOpen, setIsRouterOpen] = useState(false)
    const [isQueryOpen, setIsQueryOpen] = useState(false)

    const handleRouterOpen = useCallback(() => {
        setIsRouterOpen(!isRouterOpen)
    }, [isRouterOpen])
    const handleQueryOpen = useCallback(() => {
        setIsQueryOpen(!isQueryOpen)
    }, [isQueryOpen])
    
    useHotkeys('ctrl+shift+r', e=> {
        e.preventDefault()
        handleRouterOpen()
    }, [isRouterOpen])
    useHotkeys('ctrl+shift+q', e=> {
        e.preventDefault()
        handleQueryOpen()
    }, [isQueryOpen])

  return (
    <>
    {isQueryOpen && <ReactQueryDevtoolsPanel onClose={() => setIsQueryOpen(false)}  style={{position: 'fixed', bottom: 0, width: '100vw', height: '50vh', right: 0, zIndex: 999}}/>}
    {isRouterOpen && <TanStackRouterDevtoolsPanel onClose={() => setIsRouterOpen(false)} style={{position: 'fixed', bottom: 0, width: '100vw', height: '50vh', right: 0, zIndex: 999}}/>}
    </>
  )
}
