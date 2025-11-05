import { atom, useAtom } from "jotai"
import { useEffect } from "react"

const sidebarToggleAtom = atom(false)

const useSidebar = () => {

    const [isOpen, setIsOpen] = useAtom(sidebarToggleAtom)

    const toggle = () => {
        setIsOpen(!isOpen)
        localStorage.setItem('sidebar-toggle', !isOpen)
    }

    useEffect(() => {
        if(localStorage.getItem('sidebar-toggle') === 'true'){
            setIsOpen(true)
        }else{
            setIsOpen(false)
            localStorage.setItem('sidebar-toggle', false)
        }
    }, [])

  return {
    isOpen,
    toggle
  }
}

export default useSidebar