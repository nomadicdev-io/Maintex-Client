import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/app/_app/development/_development/terminal')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full h-full flex-1 flex flex-col items-center justify-center'>
        
        <div className="aboslute inset-0 w-full h-full z-0 pointer-events-none invert-100 opacity-50 dark:opacity-70 dark:invert-0">
            <img src="/bg-binary.svg" alt="Background Image" className="w-full h-full object-cover z-0 pointer-events-none grayscale-100" />
        </div>
    </div>
  )
}
function TerminalView() {


    return (
        <></>
    )
}

function TerminalLogin(){
  return (
    <div className="w-full h-full flex-1 flex flex-col items-center justify-center">
      <h2>Login To Terminal</h2>
    </div>
  )
}
