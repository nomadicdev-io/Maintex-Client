import { atom, useAtom } from "jotai"
import { useEffect } from "react"

const onlineAtom = atom(true)

export default function useNetInfo() {

    const [isOnline, setIsOnline] = useAtom(onlineAtom)

    useEffect(() => {
        window.addEventListener('online', () => setIsOnline(true))
        window.addEventListener('offline', () => setIsOnline(false))

        return () => {
            window.removeEventListener('online', () => setIsOnline(true))
            window.removeEventListener('offline', () => setIsOnline(false))
        }
    }, [])

  return {
    isOnline,
  }
}
