import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import Routes404 from '@/components/layouts/Routes404'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { orbitAI } from '@/api'
import orbit from '@/api'

export const Route = createFileRoute('/app/_app/')({
  component: AppHomePage,
  notFoundComponent: Routes404,
  head: ()=> ({
    meta: [
      {
        title: "Dashboard | Maintex Pro "
      }
    ]
  })
})

function AppHomePage() {

  const {data} = useQuery({
    queryKey: ['dashboard'],
    enabled: true,
    queryFn: async () => {
      try{
        const res = await orbit.get({url: 'dashboard'})
        return res.data
      }catch(error){
        console.log(error)
        return null
      }
    }
  })

  return (
    <div className="relative w-full h-full flex-1 flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-semibold">Dashboard</h1>
    </div>
  )
}
