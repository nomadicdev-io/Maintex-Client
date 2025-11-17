import { createLazyFileRoute } from '@tanstack/react-router'
import { authClient } from '@auth'
import ProfileInfo from '@/components/sections/profile/ProfileInfo'
import ProfileSettings from '@/components/sections/profile/ProfileSettings'
import DashboardBanner from '@/components/sections/DashboardBanner'
import ProfileWorkTimeline from '../../../../../../../components/sections/profile/ProfileWorkTimeline'
import ProfileStats from '../../../../../../../components/sections/profile/ProfileStats'

export const Route = createLazyFileRoute('/app/_app/account/_account/profile/_profile/')(
  {
    component: RouteComponent,
    head: ()=> ({
      meta: [
        {
          title: "Profile | Maintex Pro "
        }
      ]
    })
  },
)

function RouteComponent() {

  const {data, refetch} = authClient.useSession()

  const {tab} = Route.useSearch()
  
  return (
    <div className='relative w-full flex flex-col'>
      {/* <DashboardBanner title={'Profile Management'} description={'Manage your profile & account settings here.'} /> */}
        {
          data?.user ?
          <div className="relative w-full flex flex-col">
            <div className="relative w-full grid grid-cols-[1.35fr_2fr]">
            <ProfileInfo user={data?.user} refetch={refetch}/>
            {/* <ProfileSettings refetch={refetch} activeTab={tab}/> */}
            <ProfileStats/>
          </div>
            <ProfileWorkTimeline/>
          </div>
          :
          null
        }
    </div>
    
  )
}
