import { GitBranch, Route } from "lucide-react";
import { Button } from "./button";
import { useCallback, useState } from "react";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useTranslation } from "react-i18next";

export default function DevTools() {

    const [isRouterOpen, setIsRouterOpen] = useState(false)
    const [isQueryOpen, setIsQueryOpen] = useState(false)
    const { t } = useTranslation()

    const handleRouterOpen = useCallback(() => {
        setIsRouterOpen(!isRouterOpen)
    }, [isRouterOpen])
    const handleQueryOpen = useCallback(() => {
        setIsQueryOpen(!isQueryOpen)
    }, [isQueryOpen])
    
    
  return (
    <>
    <div className="fixed bottom-0 left-[50%] gap-2 translate-x-[-50%] p-3 bg-black/50 z-99999 flex items-center justify-center">
        <Button variant="shade" size={'sm'} onClick={handleRouterOpen}>
            <Route />
            <span>{t('router-devtools')}</span>
        </Button>
        <Button variant="shade" size={'sm'} onClick={handleQueryOpen}>
            <GitBranch />
            <span>{t('query-devtools')}</span>
        </Button>

        
    </div>
    {isQueryOpen && <ReactQueryDevtoolsPanel onClose={() => setIsQueryOpen(false)}  style={{position: 'fixed', bottom: 0, width: '100vw', height: '50vh', right: 0, zIndex: 999}}/>}
    {isRouterOpen && <TanStackRouterDevtoolsPanel onClose={() => setIsRouterOpen(false)} style={{position: 'fixed', bottom: 0, width: '100vw', height: '50vh', right: 0, zIndex: 999}}/>}
    </>
  )
}
