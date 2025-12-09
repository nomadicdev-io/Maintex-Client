import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import Routes404 from '@/components/layouts/Routes404'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip as UiTooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Plus,
  CalendarRange,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  MoreHorizontal,
  Activity,
  Target,
  Users,
  CircleDot,
  CheckCircle2,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts'
import orbit from '@/api'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/_app/')({
  component: AppHomePage,
  notFoundComponent: Routes404,
  head: () => ({
    meta: [
      {
        title: 'Dashboard | Maintex Pro ',
      },
    ],
  }),
})

const RANGE_LABELS = {
  '7d': '7 days',
  '30d': '30 days',
  '90d': '90 days',
}

const grayscalePalette = ['#f4f4f5', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b']

const decimalFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 })
const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const fallbackDashboard = {
  summary: [
    {
      id: 'velocity',
      label: 'Team velocity',
      value: 72,
      suffix: '%',
      delta: 4.8,
      trend: 'up',
      context: 'vs last sprint',
      icon: Activity,
    },
    {
      id: 'initiatives',
      label: 'Active initiatives',
      value: 18,
      delta: 2.1,
      trend: 'up',
      context: 'in execution',
      icon: Target,
    },
    {
      id: 'capacity',
      label: 'Capacity used',
      value: 86,
      suffix: '%',
      delta: -3.2,
      trend: 'down',
      context: 'resource allocation',
      icon: Users,
    },
    {
      id: 'focus',
      label: 'Focus hours',
      value: 312,
      suffix: 'h',
      delta: 12.4,
      trend: 'up',
      context: 'last 30 days',
      icon: CircleDot,
    },
  ],
  timeline: {
    '7d': [
      { label: 'Mon', completed: 22, planned: 26, focus: 68 },
      { label: 'Tue', completed: 24, planned: 28, focus: 72 },
      { label: 'Wed', completed: 28, planned: 30, focus: 75 },
      { label: 'Thu', completed: 32, planned: 34, focus: 78 },
      { label: 'Fri', completed: 30, planned: 32, focus: 74 },
      { label: 'Sat', completed: 18, planned: 20, focus: 58 },
      { label: 'Sun', completed: 16, planned: 18, focus: 52 },
    ],
    '30d': [
      { label: 'Week 1', completed: 96, planned: 102, focus: 70 },
      { label: 'Week 2', completed: 112, planned: 118, focus: 74 },
      { label: 'Week 3', completed: 128, planned: 134, focus: 79 },
      { label: 'Week 4', completed: 136, planned: 142, focus: 81 },
      { label: 'Week 5', completed: 124, planned: 132, focus: 77 },
      { label: 'Week 6', completed: 142, planned: 148, focus: 83 },
    ],
    '90d': [
      { label: 'Jan', completed: 368, planned: 382, focus: 72 },
      { label: 'Feb', completed: 412, planned: 428, focus: 75 },
      { label: 'Mar', completed: 446, planned: 458, focus: 78 },
      { label: 'Apr', completed: 472, planned: 486, focus: 80 },
      { label: 'May', completed: 498, planned: 512, focus: 83 },
      { label: 'Jun', completed: 526, planned: 544, focus: 86 },
    ],
  },
  distribution: [
    { name: 'Strategy', value: 32 },
    { name: 'Delivery', value: 28 },
    { name: 'Operations', value: 22 },
    { name: 'Quality', value: 18 },
  ],
  goals: [
    {
      title: 'Automation rollout',
      owner: 'Program Alpha',
      due: 'Due in 6 days',
      progress: 78,
      status: 'On track',
    },
    {
      title: 'Service desk uplift',
      owner: 'Service Group',
      due: 'Due in 14 days',
      progress: 64,
      status: 'Needs focus',
    },
    {
      title: 'Infrastructure hardening',
      owner: 'Platform Core',
      due: 'Due in 21 days',
      progress: 88,
      status: 'Ahead',
    },
  ],
  activity: [
    { title: 'Design review sync', type: 'Workshop', time: 'Today · 14:00' },
    { title: 'Executive update', type: 'Briefing', time: 'Tomorrow · 09:30' },
    { title: 'QA retrospective', type: 'Retro', time: 'Friday · 16:00' },
    { title: 'Ops stand-up', type: 'Stand-up', time: 'Daily · 08:45' },
  ],
  highlights: [
    { name: 'Product direction', owner: 'Miya Patel', completion: 88, delta: 5.6 },
    { name: 'Ops excellence', owner: 'Jordan Mills', completion: 76, delta: 3.2 },
    { name: 'Platform stability', owner: 'Noah Ortiz', completion: 92, delta: 1.4 },
  ],
}

function AppHomePage() {
  const { t } = useTranslation()
  const { data, isFetching } = useQuery({
    queryKey: ['dashboard'],
    enabled: true,
    queryFn: async () => {
      try {
        const res = await orbit.get({ url: 'dashboard' })
        return res.data
      } catch (error) {
        console.log(error)
        return null
      }
    },
  })

  const [range, setRange] = useState('30d')

  const dashboardData = data && typeof data === 'object' && !Array.isArray(data) ? data : {}

  const baseSummary = useMemo(() => {
    const summary = dashboardData.summary ?? dashboardData.metrics
    return Array.isArray(summary) && summary.length ? summary : fallbackDashboard.summary
  }, [dashboardData])

  const timeline = useMemo(() => {
    const candidate = dashboardData.timeline ?? dashboardData.activityTimeline
    if (candidate && typeof candidate === 'object') {
      return {
        ...fallbackDashboard.timeline,
        ...candidate,
      }
    }
    return fallbackDashboard.timeline
  }, [dashboardData])

  const distribution = useMemo(() => {
    const candidate = dashboardData.distribution ?? dashboardData.workload
    return Array.isArray(candidate) && candidate.length ? candidate : fallbackDashboard.distribution
  }, [dashboardData])

  const goals = useMemo(() => {
    const candidate = dashboardData.goals ?? dashboardData.objectives
    return Array.isArray(candidate) && candidate.length ? candidate : fallbackDashboard.goals
  }, [dashboardData])

  const activity = useMemo(() => {
    const candidate = dashboardData.activity ?? dashboardData.upcoming
    return Array.isArray(candidate) && candidate.length ? candidate : fallbackDashboard.activity
  }, [dashboardData])

  const highlights = useMemo(() => {
    const candidate = dashboardData.highlights ?? dashboardData.teams
    return Array.isArray(candidate) && candidate.length ? candidate : fallbackDashboard.highlights
  }, [dashboardData])

  const summaryCards = useMemo(() => {
    const fallbackIcons = [Activity, Target, Users, CircleDot]
    return baseSummary.map((metric, index) => {
      const fallbackMetric = fallbackDashboard.summary[index % fallbackDashboard.summary.length]
      const iconCandidate = metric.icon
      const IconComponent = typeof iconCandidate === 'function'
        ? iconCandidate
        : fallbackMetric.icon ?? fallbackIcons[index % fallbackIcons.length]
      const rawValue =
        typeof metric.value === 'number' || typeof metric.value === 'string'
          ? metric.value
          : metric.total ?? metric.count ?? fallbackMetric.value
      const suffix = metric.suffix ?? fallbackMetric.suffix ?? ''
      const formattedValue = typeof rawValue === 'number'
        ? `${rawValue >= 1000 && suffix !== '%' && suffix !== 'h'
            ? compactFormatter.format(rawValue)
            : decimalFormatter.format(rawValue)}${suffix ?? ''}`
        : rawValue ?? '—'
      const deltaRaw = Number(
        metric.delta ?? metric.change ?? metric.percentage ?? fallbackMetric.delta ?? 0
      )
      const trend = metric.trend ?? (deltaRaw >= 0 ? 'up' : 'down')
      const context =
        metric.context ?? metric.description ?? metric.caption ?? fallbackMetric.context ?? 'vs last period'
      return {
        key: metric.id ?? metric.key ?? fallbackMetric.id ?? index,
        label: metric.label ?? metric.title ?? fallbackMetric.label,
        Icon: IconComponent,
        formattedValue,
        delta: deltaRaw,
        trend,
        context,
      }
    })
  }, [baseSummary])

  const availableRanges = useMemo(() => Object.keys(timeline), [timeline])

  useEffect(() => {
    if (!availableRanges.includes(range) && availableRanges.length > 0) {
      setRange(availableRanges[0])
    }
  }, [availableRanges, range])

  const timelineData = useMemo(() => {
    const selected = timeline[range] ?? timeline[availableRanges[0]] ?? []
    if (Array.isArray(selected)) {
      return selected.map((item, index) => ({
        label: item.label ?? item.day ?? item.date ?? `P${index + 1}`,
        completed: Number(item.completed ?? item.done ?? item.actual ?? item.value ?? 0),
        planned: Number(item.planned ?? item.forecast ?? item.expected ?? item.target ?? 0),
        focus: Number(item.focus ?? item.utilization ?? item.hours ?? 0),
      }))
    }
    return []
  }, [timeline, range, availableRanges])

  const timelineStats = useMemo(() => {
    if (!timelineData.length) {
      return { completed: 0, planned: 0, focus: 0 }
    }
    const last = timelineData[timelineData.length - 1]
    const focusAvg =
      timelineData.reduce((total, item) => total + (item.focus || 0), 0) /
      timelineData.length
    return {
      completed: last.completed ?? 0,
      planned: last.planned ?? 0,
      focus: focusAvg || 0,
    }
  }, [timelineData])

  const workloadData = useMemo(() => {
    return distribution.map((item, index) => ({
      name: item.name ?? item.label ?? `Segment ${index + 1}`,
      value: Number(item.value ?? item.percentage ?? item.share ?? 0),
      fill: grayscalePalette[index % grayscalePalette.length],
    }))
  }, [distribution])

  const topSegment = useMemo(() => {
    if (!workloadData.length) return null
    return workloadData.reduce((acc, item) => (item.value > (acc?.value ?? -Infinity) ? item : acc), null)
  }, [workloadData])

  const goalsList = useMemo(() => {
    return goals.map((goal, index) => ({
      key: goal.id ?? goal.key ?? goal.title ?? index,
      title: goal.title ?? goal.name ?? `Goal ${index + 1}`,
      owner: goal.owner ?? goal.responsible ?? goal.team ?? '—',
      due: goal.due ?? goal.dueAt ?? goal.deadline ?? '',
      progress: Number(goal.progress ?? goal.completion ?? goal.percent ?? 0),
      status: goal.status ?? goal.state ?? 'On track',
    }))
  }, [goals])

  const activityList = useMemo(() => {
    return activity.map((entry, index) => ({
      key: entry.id ?? entry.key ?? entry.title ?? index,
      title: entry.title ?? entry.name ?? `Session ${index + 1}`,
      type: entry.type ?? entry.category ?? 'Session',
      time: entry.time ?? entry.when ?? '',
    }))
  }, [activity])

  const highlightList = useMemo(() => {
    return highlights.map((item, index) => ({
      key: item.id ?? item.key ?? item.name ?? index,
      name: item.name ?? item.team ?? `Team ${index + 1}`,
      owner: item.owner ?? item.lead ?? '',
      completion: Number(item.completion ?? item.progress ?? 0),
      delta: Number(item.delta ?? item.change ?? 0),
    }))
  }, [highlights])

  const renderTimelineTooltip = useCallback(({ active, payload, label }) => {
    if (!active || !payload?.length) {
      return null
    }

    return (
      <div className="rounded-lg border px-3 py-2 text-xs shadow-lg">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
        <div className="mt-2 space-y-1">
          {payload.map((item) => (
            <div key={item.dataKey} className="flex items-center justify-between gap-4 text-sm">
              <span className="text-zinc-400">{item.name}</span>
              <span className="font-semibold text-zinc-100">
                {decimalFormatter.format(Number(item.value ?? 0))}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }, [])

  const isLoading = isFetching && !data

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(24,24,27,0.85),_rgba(9,9,11,0.95))]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_0%,_rgba(63,63,70,0.18),_transparent_55%)]" />
      <div className="relative z-10 flex flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-10">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <Badge className="border border-zinc-700/70 bg-zinc-900/70 text-zinc-200">
              {t('dashboard')}
            </Badge>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
                {t('dashboard')}
              </h1>
              <p className="max-w-xl text-sm text-zinc-400">
                {t(
                  'dashboard_intro',
                  'Monitor momentum, capacity and delivery health across every initiative.'
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700/70 bg-zinc-900/60 text-zinc-200 hover:bg-zinc-800/70"
            >
              <CalendarRange className="size-4" />
              {RANGE_LABELS[range] ?? RANGE_LABELS['30d']}
            </Button>
            <Button
              variant="defaultShade"
              size="sm"
              className="border-zinc-700/70 bg-zinc-100/10 text-zinc-100 hover:bg-zinc-100/20"
            >
              <Plus className="size-4" />
              {t('dashboard_create_report', 'Create report')}
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((metric, index) => {
            const TrendIcon = metric.delta >= 0 ? ArrowUpRight : ArrowDownRight
            const deltaDisplay = `${metric.delta >= 0 ? '+' : ''}${decimalFormatter.format(
              Math.abs(metric.delta)
            )}%`
            const IconComponent = metric.Icon ?? Activity

            return (
              <Card
                key={metric.key ?? index}
                className="border-zinc-800/70 bg-zinc-950/70 text-zinc-100 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:border-zinc-600/60"
              >
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="space-y-2">
                    <CardDescription className="text-xs uppercase tracking-wide text-zinc-500">
                      {metric.label}
                    </CardDescription>
                    {isLoading ? (
                      <Skeleton className="h-8 w-20 rounded-md bg-zinc-800/80" />
                    ) : (
                      <CardTitle className="text-3xl font-semibold text-zinc-50">
                        {metric.formattedValue}
                      </CardTitle>
                    )}
                  </div>
                  <div className="rounded-full border border-zinc-800 bg-zinc-900/70 p-3 text-zinc-200">
                    <IconComponent className="size-5" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {isLoading ? (
                    <Skeleton className="h-4 w-24 rounded bg-zinc-800/80" />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className={`flex items-center gap-1.5 font-medium ${
                          metric.delta >= 0 ? 'text-emerald-300' : 'text-rose-300'
                        }`}
                      >
                        <TrendIcon className="size-4" />
                        {deltaDisplay}
                      </span>
                      <span className="text-zinc-500">{metric.context}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-6">
            <Card className="border-zinc-800/70 bg-zinc-950/70 text-zinc-100 backdrop-blur-sm">
              <CardHeader className="gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl text-zinc-50">Delivery momentum</CardTitle>
                  <CardDescription className="text-sm text-zinc-400">
                    Completed work compared against planned targets for the selected window.
                  </CardDescription>
                </div>
                <CardAction className="flex flex-col items-end gap-3 sm:flex-row sm:items-center">
                  <Tabs value={range} onValueChange={setRange} className="w-full sm:w-auto">
                    <TabsList className="w-full gap-2 border-zinc-800/70 bg-transparent sm:w-auto">
                      {availableRanges.map((value) => (
                        <TabsTrigger
                          key={value}
                          value={value}
                          className="text-xs uppercase tracking-wide text-zinc-500 data-[state=active]:bg-zinc-900/80 data-[state=active]:text-zinc-100"
                        >
                          {RANGE_LABELS[value] ?? value}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                  <UiTooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="border border-transparent text-zinc-500 hover:border-zinc-700/70 hover:bg-zinc-900/70 hover:text-zinc-100"
                      >
                        <Info className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="border border-zinc-800/70 bg-zinc-950/90 text-zinc-100">
                      Tracks completion versus plan across teams and highlights focus hours.
                    </TooltipContent>
                  </UiTooltip>
                </CardAction>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-64 w-full">
                  {isLoading ? (
                    <Skeleton className="h-full w-full rounded-xl border border-zinc-800/70 bg-zinc-900/60" />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={timelineData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#e4e4e7" stopOpacity={0.85} />
                            <stop offset="95%" stopColor="#71717a" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a1a1aa" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#3f3f46" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#27272a" strokeDasharray="4 8" vertical={false} />
                        <XAxis
                          dataKey="label"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#a1a1aa', fontSize: 12 }}
                          dy={6}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#a1a1aa', fontSize: 12 }}
                          width={48}
                        />
                        <RechartsTooltip content={renderTimelineTooltip} cursor={{ stroke: '#3f3f46', strokeDasharray: '3 3' }} />
                        <Area
                          type="monotone"
                          dataKey="completed"
                          name="Completed"
                          stroke="#e4e4e7"
                          strokeWidth={2.4}
                          fill="url(#colorCompleted)"
                          activeDot={{ r: 5 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="planned"
                          name="Planned"
                          stroke="#a1a1aa"
                          strokeWidth={2}
                          fill="url(#colorPlanned)"
                          activeDot={{ r: 4 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/60 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">Completed</p>
                    <p className="text-lg font-semibold text-zinc-50">
                      {decimalFormatter.format(Math.round(timelineStats.completed))}
                    </p>
                    <p className="text-xs text-zinc-500">Most recent interval</p>
                  </div>
                  <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/60 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">Planned</p>
                    <p className="text-lg font-semibold text-zinc-50">
                      {decimalFormatter.format(Math.round(timelineStats.planned))}
                    </p>
                    <p className="text-xs text-zinc-500">Committed scope</p>
                  </div>
                  <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/60 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">Focus hours</p>
                    <p className="text-lg font-semibold text-zinc-50">
                      {decimalFormatter.format(Math.round(timelineStats.focus))}h
                    </p>
                    <p className="text-xs text-zinc-500">Average for range</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-800/70 bg-zinc-950/70 text-zinc-100 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-xl text-zinc-50">Upcoming sessions</CardTitle>
                  <CardDescription className="text-sm text-zinc-400">
                    Collaborative touchpoints to keep the work moving.
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="border border-transparent text-zinc-500 hover:border-zinc-700/70 hover:bg-zinc-900/70 hover:text-zinc-100"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {activityList.map((item) => (
                  <div
                    key={item.key}
                    className="flex flex-col gap-3 rounded-xl border border-zinc-800/70 bg-zinc-900/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-zinc-100">{item.title}</p>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Badge className="border-zinc-700/80 bg-zinc-900/70 text-zinc-300">{item.type}</Badge>
                        <span>{item.time}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="self-start border border-zinc-700/70 text-zinc-200 hover:bg-zinc-900/70"
                    >
                      View details
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6">
            <Card className="border-zinc-800/70 bg-zinc-950/70 text-zinc-100 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-xl text-zinc-50">Workload balance</CardTitle>
                  <CardDescription className="text-sm text-zinc-400">
                    Allocation across capability streams this cycle.
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="border border-transparent text-zinc-500 hover:border-zinc-700/70 hover:bg-zinc-900/70 hover:text-zinc-100"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-56 w-full">
                  {isLoading ? (
                    <Skeleton className="h-full w-full rounded-xl border border-zinc-800/70 bg-zinc-900/60" />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        data={workloadData}
                        innerRadius="20%"
                        outerRadius="90%"
                        barSize={18}
                        startAngle={90}
                        endAngle={-270}
                      >
                        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                        <RadialBar
                          background={{ fill: 'rgba(39,39,42,0.35)' }}
                          dataKey="value"
                          cornerRadius={8}
                          clockWise
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <ul className="space-y-3 text-sm">
                  {workloadData.map((item) => (
                    <li key={item.name} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: item.fill }}
                        />
                        <span className="text-zinc-300">{item.name}</span>
                      </div>
                      <span className="font-semibold text-zinc-100">{decimalFormatter.format(item.value)}%</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              {topSegment ? (
                <CardFooter className="border-t border-zinc-800/70 pt-4">
                  <Badge className="border-zinc-700/70 bg-zinc-900/70 text-zinc-200">
                    Most time: {topSegment.name}
                  </Badge>
                </CardFooter>
              ) : null}
            </Card>

            <Card className="border-zinc-800/70 bg-zinc-950/70 text-zinc-100 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-xl text-zinc-50">Milestones</CardTitle>
                  <CardDescription className="text-sm text-zinc-400">
                    Track progress on the outcomes that matter next.
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="border border-transparent text-zinc-500 hover:border-zinc-700/70 hover:bg-zinc-900/70 hover:text-zinc-100"
                >
                  <CheckCircle2 className="size-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {goalsList.map((goal) => (
                  <div
                    key={goal.key}
                    className="rounded-xl border border-zinc-800/70 bg-zinc-900/50 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-zinc-100">{goal.title}</p>
                        <p className="text-xs text-zinc-500">{goal.owner}</p>
                      </div>
                      <Badge className="border-zinc-700/70 bg-zinc-900/70 text-zinc-200">
                        {goal.status}
                      </Badge>
                    </div>
                    {goal.due ? (
                      <p className="mt-2 text-xs text-zinc-500">{goal.due}</p>
                    ) : null}
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full border border-zinc-800/70 bg-zinc-900/70">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-100"
                        style={{ width: `${Math.max(0, Math.min(100, goal.progress))}%` }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                      <span>Progress</span>
                      <span>{decimalFormatter.format(goal.progress)}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-zinc-800/70 bg-zinc-950/70 text-zinc-100 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-zinc-50">Team signals</CardTitle>
                <CardDescription className="text-sm text-zinc-400">
                  Confidence levels and week-over-week momentum.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {highlightList.map((item) => (
                  <div
                    key={item.key}
                    className="flex flex-col gap-3 rounded-xl border border-zinc-800/70 bg-zinc-900/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-zinc-100">{item.name}</p>
                      <p className="text-xs text-zinc-500">{item.owner}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden h-2 w-24 overflow-hidden rounded-full border border-zinc-800/70 bg-zinc-900/70 sm:block">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-100"
                          style={{ width: `${Math.max(0, Math.min(100, item.completion))}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-zinc-50">
                          {decimalFormatter.format(item.completion)}%
                        </span>
                        <Badge
                          className={`border-zinc-700/70 bg-zinc-900/70 ${
                            item.delta >= 0 ? 'text-emerald-300' : 'text-rose-300'
                          }`}
                        >
                          {`${item.delta >= 0 ? '+' : ''}${decimalFormatter.format(item.delta)}%`}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
