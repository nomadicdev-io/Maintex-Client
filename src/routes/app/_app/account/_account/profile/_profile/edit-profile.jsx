import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTranslation } from 'react-i18next'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'

export const Route = createFileRoute(
  '/app/_app/account/_account/profile/_profile/edit-profile',
)({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Edit Profile | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {

  const search = Route.useSearch()
  const {t} = useTranslation()

  console.log('SEARCH', search)

  const sections = {
    'personal-info': PersonalInfo,
    'company-profile': CompanyProfile,
    education: Education,
    experience: Experience,
    documents: Documents,
    security: Security,
    notifications: Notifications,
    'recent-activity': RecentActivity,
  }

  const ActiveSection = sections[search.tab] ?? PersonalInfo

  return (
    <div className="relative w-full flex">
        <ScrollArea className="relative block h-[calc(100vh-4rem)] w-[17rem]" scrollHideDelay={300}>
          <ProfileSidebar />
        </ScrollArea>
        <ScrollArea className="relative w-full block h-[calc(100vh-4rem)] flex-1" scrollHideDelay={300}>
      <ActiveSection />
        </ScrollArea>
    </div>
  )
}

function ProfileSidebar() {

  const {t} = useTranslation()
  
  const sidebarNav = [
    {
      id: 's-nav-01',
      label: t('personal-info'),
      search: 'personal-info',
    },
    {
      id: 's-nav-02',
      label: t('company-profile'),
      search: 'company-profile',
    },
    {
      id: 's-nav-03',
      label: t('education'),
      search: 'education',
    },
    {
      id: 's-nav-04',
      label: t('experience'),
      search: 'experience',
    },
    {
      id: 's-nav-05',
      label: t('documents'),
      search: 'documents',
    },
    {
      id: 's-nav-06',
      label: t('security'),
      search: 'security',
    },
    {
      id: 's-nav-07',
      label: t('notifications'),
      search: 'notifications',
    },
    {
      id: 's-nav-08',
      label: t('recent-activity'),
      search: 'recent-activity',
    },
  ]

  return (
    <div className="relative w-full flex flex-col h-full border-e border-e-border overflow-y-scroll scrollbar-hide">
      <div className="w-full px-3 py-3 text-lg font-semibold border-b border-b-border text-text">{t('edit-profile')}</div>
      <div className="w-full h-full flex flex-col pt-2">
        {
          sidebarNav.map((item) => (
            <SidebarNavItem key={item.id} item={item} />
          ))
        }
      </div>
    </div>
  )
}

function SidebarNavItem({ item }){
  return (
    <Link search={{tab: item.search}} activeOptions={{exact: true}} viewTransition={{ types: ['slide-right'] }} className="relative w-full h-auto py-2 px-4 text-text/40 hover:text-text/90 font-medium text-base [&.active]:text-text/90">
      {item.label}
    </Link>
  )
}

function PersonalInfo() {

  const {t} = useTranslation()

  return (
    <div className='relative w-full flex flex-col [view-transition-name:main-content]'>
      <DashboardBanner title={t('personal-info')} description={t('personal-info-description')} />
    </div>
  )
}

function CompanyProfile() {
  const { t } = useTranslation()
  return (
    <div className="relative w-full flex flex-col [view-transition-name:main-content]">
      <DashboardBanner title={t('company-profile')} description={t('company-profile-description')} />
    </div>
  )
}

function Education() {
  const { t } = useTranslation()
  return (
    <div className="relative w-full flex flex-col [view-transition-name:main-content]">
      <DashboardBanner title={t('education')} description={t('education-description')} />
    </div>
  )
}

function Experience() {
  const { t } = useTranslation()
  return (
    <div className="relative w-full flex flex-col [view-transition-name:main-content]">
      <DashboardBanner title={t('experience')} description={t('experience-description')} />
    </div>
  )
}

function Documents() {
  const { t } = useTranslation()
  return (
    <div className="relative w-full flex flex-col [view-transition-name:main-content]">
      <DashboardBanner title={t('documents')} description={t('documents-description')} />
    </div>
  )
}

function Security() {
  const { t } = useTranslation()
  return (
    <div className="relative w-full flex flex-col [view-transition-name:main-content]">
      <DashboardBanner title={t('security')} description={t('security-description')} />
    </div>
  )
}

function Notifications() {
  const { t } = useTranslation()
  return (
    <div className="relative w-full flex flex-col [view-transition-name:main-content]">
      <DashboardBanner title={t('notifications')} description={t('notifications-description')} />
    </div>
  )
}

function RecentActivity() {
  const { t } = useTranslation()
  return (
    <div className="relative w-full flex flex-col [view-transition-name:main-content]">
      <DashboardBanner title={t('recent-activity')} description={t('recent-activity-description')} />
    </div>
  )
}