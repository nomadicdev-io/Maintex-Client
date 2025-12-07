import { createLazyFileRoute } from '@tanstack/react-router'
import {
  DownloadIcon,
  CalendarDays,
  Filter,
  Search,
  CheckCircle2,
  Clock4,
  Plane,
  UserX,
} from 'lucide-react'
import DashboardBanner from '../../../../../components/sections/DashboardBanner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

const attendanceSummaryCards = [
  {
    id: 'present',
    title: 'Present Today',
    value: '40',
    meta: '124 People Remaining',
    icon: CheckCircle2,
    accentClass: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-600',
  },
  {
    id: 'late',
    title: 'Late Entry',
    value: '26',
    meta: '12 People are on Time',
    icon: Clock4,
    accentClass: 'border-amber-500/25 bg-amber-500/12 text-amber-600',
  },
  {
    id: 'leave',
    title: 'On Leave',
    value: '04',
    meta: 'Approved Leave',
    icon: Plane,
    accentClass: 'border-violet-500/25 bg-violet-500/12 text-violet-600',
  },
  {
    id: 'absent',
    title: 'Absent',
    value: '01',
    meta: 'Without Informing',
    icon: UserX,
    accentClass: 'border-rose-500/25 bg-rose-500/12 text-rose-600',
  },
]

const appliedAttendanceFilters = ['Leave', 'Absent', 'Active']

const filterOptions = [
  'All Employees',
  'Present Today',
  'Late Entry',
  'On Leave',
  'Absent',
]

const dateOptions = [
  '06, July 2025',
  '15, July 2025',
  '08, August 2025',
  '12, September 2025',
]

const attendanceWeek = [
  { key: 'sun', label: 'Sunday', date: '4' },
  { key: 'mon', label: 'Monday', date: '5' },
  { key: 'tue', label: 'Tuesday', date: '6' },
  { key: 'wed', label: 'Wednesday', date: '7' },
  { key: 'thu', label: 'Thursday', date: '8' },
  { key: 'fri', label: 'Friday', date: '9' },
  { key: 'sat', label: 'Saturday', date: '10' },
]

const badgeToneClasses = {
  success: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-600',
  warning: 'border-amber-500/25 bg-amber-500/12 text-amber-600',
  info: 'border-violet-500/25 bg-violet-500/12 text-violet-600',
  danger: 'border-rose-500/25 bg-rose-500/12 text-rose-600',
  neutral: 'border-slate-400/25 bg-slate-400/12 text-slate-700',
}

const attendanceRecords = [
  {
    id: 'dianne-russell',
    name: 'Dianne Russell',
    role: 'UI/UX Designer',
    avatar: '/avatar.jpg',
    avatarFallbackColor: 'bg-orange-500',
    days: {
      sun: { label: '8 Hours', tone: 'success' },
      mon: { label: '4h 36m', tone: 'warning' },
      tue: { label: 'Leave', tone: 'info' },
      wed: { label: '8h 39m', tone: 'success' },
      thu: { label: 'Active', tone: 'success' },
      fri: null,
      sat: null,
    },
  },
  {
    id: 'bessie-cooper',
    name: 'Bessie Cooper',
    role: 'Product Designer',
    avatar: '/avatar-light.png',
    avatarFallbackColor: 'bg-sky-500',
    days: {
      sun: { label: '6h 24m', tone: 'warning' },
      mon: { label: '8 Hours', tone: 'success' },
      tue: { label: '8 Hours', tone: 'success' },
      wed: { label: 'Absent', tone: 'danger' },
      thu: { label: 'Active', tone: 'success' },
      fri: null,
      sat: null,
    },
  },
  {
    id: 'brooklyn-jones',
    name: 'Brooklyn Jones',
    role: 'Marketing Officer',
    avatar: '/avatar-dark.png',
    avatarFallbackColor: 'bg-pink-500',
    days: {
      sun: { label: '8 Hours', tone: 'success' },
      mon: { label: '8h 12m', tone: 'success' },
      tue: { label: '3h 45m', tone: 'warning' },
      wed: { label: '8 Hours', tone: 'success' },
      thu: { label: 'Leave', tone: 'info' },
      fri: null,
      sat: null,
    },
  },
  {
    id: 'eleanor-pena',
    name: 'Eleanor Pena',
    role: 'Content Writer',
    avatar: '/user-avatar.png',
    avatarFallbackColor: 'bg-emerald-500',
    days: {
      sun: { label: '8h 15m', tone: 'success' },
      mon: { label: '8 Hours', tone: 'success' },
      tue: { label: '8h 23m', tone: 'success' },
      wed: { label: '7h 24m', tone: 'warning' },
      thu: { label: 'Active', tone: 'success' },
      fri: null,
      sat: null,
    },
  },
  {
    id: 'darlene-robert',
    name: 'Darlene Robert',
    role: 'UX Engineer',
    avatar: '/user-avatar-dark.png',
    avatarFallbackColor: 'bg-indigo-500',
    days: {
      sun: { label: '8 Hours', tone: 'success' },
      mon: { label: '5h 17m', tone: 'warning' },
      tue: { label: '4h 13m', tone: 'warning' },
      wed: { label: 'Leave', tone: 'info' },
      thu: { label: 'Active', tone: 'success' },
      fri: null,
      sat: null,
    },
  },
]

const getInitials = (name) =>
  name
    .split(' ')
    .map((segment) => segment.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

function AttendanceManagementSection() {
  return (
    <section className="space-y-6 rounded-2xl border border-border/70 bg-background/80 p-6 shadow-sm">

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {attendanceSummaryCards.map((card) => {
          const Icon = card.icon
          return (
            <Card
              key={card.id}
              className="border-border/70 bg-card/90 transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {card.meta}
                  </CardDescription>
                </div>
                <CardAction className="self-start">
                  <div
                    className={cn(
                      'flex size-11 items-center justify-center rounded-full border',
                      card.accentClass,
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                </CardAction>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-3xl font-semibold text-foreground">{card.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="space-y-3 rounded-2xl border border-dashed border-border/60 bg-card/50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex min-w-[220px] flex-1 items-center">
            <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
            <Input
              className="h-11 rounded-full border-border/70 bg-background/80 pl-10 text-sm"
              placeholder="Search anything ..."
              type="search"
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 rounded-full border-border/70 px-4"
                >
                  <Filter className="size-4" />
                  Filter 03
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {filterOptions.map((option) => (
                  <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 rounded-full border-border/70 px-4"
                >
                  <CalendarDays className="size-4" />
                  08, August 2025
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {dateOptions.map((option) => (
                  <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {appliedAttendanceFilters.map((filter) => (
            <Badge
              key={filter}
              variant="outline"
              className="rounded-full border-border/60 bg-background/70 px-3 py-1 text-xs font-medium"
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card shadow-sm [&>div]:rounded-none [&>div]:border-none [&>div]:bg-transparent">
        <Table className="min-w-[720px] text-sm">
          <TableHeader>
            <TableRow className="bg-background/80">
              <TableHead className="min-w-[220px] rounded-tl-2xl border-e border-border/60 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Employee
              </TableHead>
              {attendanceWeek.map((day) => (
                <TableHead
                  key={day.key}
                  className="min-w-[120px] border-e border-border/60 text-left"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground">
                      {day.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{day.date}</span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceRecords.map((record) => (
              <TableRow key={record.id} className="bg-background/60">
                <TableCell className="border-border/60">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      {record.avatar ? (
                        <AvatarImage src={record.avatar} alt={record.name} />
                      ) : null}
                      <AvatarFallback
                        className={cn(
                          'text-sm font-semibold uppercase text-white',
                          record.avatarFallbackColor,
                        )}
                      >
                        {getInitials(record.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">
                        {record.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{record.role}</p>
                    </div>
                  </div>
                </TableCell>
                {attendanceWeek.map((day) => {
                  const cell = record.days[day.key]
                  return (
                    <TableCell key={day.key} className="border-border/60">
                      {cell ? (
                        <Badge
                          variant="outline"
                          className={cn(
                            'rounded-full px-3 py-1 text-xs font-semibold shadow-sm',
                            badgeToneClasses[cell.tone],
                          )}
                        >
                          {cell.label}
                        </Badge>
                      ) : (
                        <div className="flex h-[36px] items-center justify-center rounded-lg border border-dashed border-border/50 bg-muted/30 text-[11px] uppercase tracking-wide text-muted-foreground">
                          —
                        </div>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export const Route = createLazyFileRoute('/app/_app/hr/_hr/attendance')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ScrollArea className="relative w-full block h-full" scrollHideDelay={300}>
      <div className="relative flex w-full flex-col gap-6">
        <DashboardBanner
          title={'Employee Attendance'}
          description={'Analyze and manage employee attendance records.'}
        >
          <Button variant="shade">
            <DownloadIcon />
            Download Daily Report
          </Button>
        </DashboardBanner>
        <AttendanceManagementSection />
      </div>
    </ScrollArea>
  )
}
