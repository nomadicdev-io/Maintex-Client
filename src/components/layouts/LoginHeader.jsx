import { useTheme } from 'next-themes'
export default function LoginHeader() {

  const {resolvedTheme} = useTheme()
  
  return (
    <header className="fixed top-0 left-0 flex items-center justify-center w-full py-8 z-999">
        <div className="container flex items-center justify-between">
        <img src={resolvedTheme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'} alt="Planet Green Solutions Logo" className="w-auto h-[1.75rem]" />
        <div className="block relative">
            <p className="text-sm text-text/50 font-regular text-center">PGS iO &copy; {new Date().getFullYear()} </p>
          </div>
        </div>
      </header>
  )
}
