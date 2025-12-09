import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { authClient } from '@auth'
import ProfileInfo from '@/components/sections/profile/ProfileInfo'
import DashboardBanner from '@/components/sections/DashboardBanner'
import { Separator } from '@/components/ui/separator'
import {CheckCircle2, Clock3, LogOutIcon, UserPen, AlertCircle, CalendarClock, Hash, GitBranch, GitFork } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/hooks/useAuthStore'
import { Activity, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const Route = createLazyFileRoute('/app/_app/account/_account/profile/_profile/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Profile | Maintex Pro ',
      },
    ],
  }),
})

function RouteComponent() {

  const { data, refetch } = authClient.useSession()
  const router = useRouter()
  const { t } = useTranslation()
  const {logout} = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  console.log('DATA', data?.user)

  const handleSignOut = async() => {
    setIsLoading(true)
    try{

        await logout()
        router.invalidate()
        router.navigate({to: '/', replace: true})
        queryClient.clear()

    }catch(error){
        console.log(error)
        toast.error(error.message)
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <div className='relative flex w-full flex-col'>
      <DashboardBanner
        title='Account & Profile Settings'
        description='Manage your account and profile settings here.'
        className='supports-[backdrop-filter]:bg-bg/40'
      >
        <div className='flex gap-2'>
          <Button variant='shade' onClick={() => router.navigate({ to: '/app/account/profile/edit-profile' })}>
            <UserPen />
            <span>{t('edit-profile')}</span>
          </Button>
          <Button variant='dangerShade' onClick={handleSignOut} disabled={isLoading}>
            <LogOutIcon />
            <span>{t('log-out')}</span>
          </Button>
        </div>
      </DashboardBanner>

      <Activity mode={data?.user ? 'visible' : 'hidden'}>
        <div className="relative grid grid-cols-[1fr_1.75fr] w-full">
          <ProfileInfo user={data?.user} refetch={refetch} />
          <ProfileStats activeTab="general" />
        </div>
      </Activity>

    </div>
  )
}

function ProfileStats() {
  return (
    <div className="relative w-full flex flex-col border-b border-border">
      <div className="grid relative grid-cols-3">
        <div className="relative w-full flex justify-between px-5 py-4 border-e border-b border-border">
          <div className="block flex-1">
            <p className="text-sm text-text/75 mb-1">Total Tasks</p>
            <h4 className="text-4xl font-semibold">100</h4>
          </div>
          <div className="inline-flex items-center w-10 h-10 justify-center rounded-lg bg-bg-100/60">
            <Hash className="text-text/50" size={24} />
          </div>
        </div>
        <div className="relative w-full flex justify-between px-5 py-4 border-e border-b border-border">
          <div className="block flex-1">
            <p className="text-sm text-text/75 mb-1">Completed Tasks</p>
            <h4 className="text-4xl font-semibold">45</h4>
          </div>
          <div className="inline-flex items-center w-10 h-10 justify-center rounded-lg bg-bg-100/60">
            <GitBranch className="text-text/50" size={24} />
          </div>
        </div>
        <div className="relative w-full flex justify-between px-5 py-4 border-b border-border">
          <div className="block flex-1">
            <p className="text-sm text-text/75 mb-1">Pending Tasks</p>
            <h4 className="text-4xl font-semibold">13</h4>
          </div>
          <div className="inline-flex items-center w-10 h-10 justify-center rounded-lg bg-bg-100/60">
            <GitFork className="text-text/50" size={24} />
          </div>
        </div>
      </div>
      <ProfileChart />
    </div>
  )
}

export const description = "A multiple bar chart"
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
}

function ProfileChart() {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-text)" radius={4} />
            <Bar dataKey="mobile" fill="#dadada" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}