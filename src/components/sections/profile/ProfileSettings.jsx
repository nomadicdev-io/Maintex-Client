import CustomTabs from "../../ui/CustomTabs"
import GeneralSettings from "./GeneralSettings"
import DriveSettings from "./DriveSettings"
import ContactSettings from "./ContactSettings"
import SecuritySettings from "./SecuritySettings"
import NotificationsSettings from "./NotificationsSettings"
import RecentActivitySettings from "./RecentActivitySettings"
import { useMemo } from "react"

const tabs = [
  {
    id: 'general',
    label: 'General',
    slug: 'general'
  },
  {
    id: 'drive',
    label: 'Drive',
    slug: 'drive'
  },
  {
    id: 'contact',
    label: 'Contact',
    slug: 'contact'
  },
  {
    id: 'security',
    label: 'Security',
    slug: 'security'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    slug: 'notifications'
  },
  {
    id: 'recent-activity',
    label: 'Recent Activity',
    slug: 'recent-activity'
  }
]

export default function ProfileSettings({activeTab}) {

  const active = useMemo(() => activeTab || tabs[0].slug, [activeTab])

  return (
    <div className="relative flex flex-col overflow-hidden">
        <h2 className="text-2xl font-semibold"> User Settings</h2>

        <div className="relative mt-5 w-full flex flex-col gap-6">
          <CustomTabs tabs={tabs} active={active}/>

          <div className="relative w-full flex flex-col gap-6">
            {
              active === 'general' && <GeneralSettings/>
            }

            {
              active === 'drive' && <DriveSettings/>
            }

            {
              active === 'contact' && <ContactSettings/>
            }

            {
              active === 'security' && <SecuritySettings/>
            }

            {
              active === 'notifications' && <NotificationsSettings/>
            }

            {
              active === 'recent-activity' && <RecentActivitySettings/>
            }
          </div>
        </div>
    </div>
  )
}
