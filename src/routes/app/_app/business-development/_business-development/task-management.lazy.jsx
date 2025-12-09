import { useMemo, useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../components/sections/DashboardBanner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { KanbanSquare, ListIcon, Plus } from 'lucide-react'

const STATUS_ORDER = ['backlog', 'in-progress', 'review', 'completed']

const STATUS_META = {
  backlog: {
    label: 'Backlog',
    badge: 'border-border/65 text-text/65',
  },
  'in-progress': {
    label: 'In progress',
    badge: 'border-border/65 text-text/70',
  },
  review: {
    label: 'Review',
    badge: 'border-border/65 text-text/70',
  },
  completed: {
    label: 'Completed',
    badge: 'border-border/65 text-text/60',
  },
}

const PRIORITY_META = {
  low: 'border-border/65 text-text/65',
  medium: 'border-border/60 text-text/70',
  high: 'border-border/55 text-text/75',
  critical: 'border-border text-text',
}

const MOCK_TASKS = [
  {
    id: 'tsk-1',
    title: 'Qualify inbound leads from Expo 2025',
    description:
      'Review submitted contact forms, enrich company info, and assign hot prospects.',
    owner: 'Alan Sha',
    status: 'backlog',
    priority: 'high',
    dueDate: '2025-02-04T09:00:00.000Z',
    updatedAt: '2025-01-28T10:12:00.000Z',
    progress: 20,
    tags: ['Leads', 'Expo'],
  },
  {
    id: 'tsk-2',
    title: 'Prepare partnership deck for Aurora Labs',
    description:
      'Refresh metrics and tailor use cases for Aurora Labs leadership presentation.',
    owner: 'Mira Chen',
    status: 'in-progress',
    priority: 'critical',
    dueDate: '2025-01-31T13:30:00.000Z',
    updatedAt: '2025-01-29T07:52:00.000Z',
    progress: 65,
    tags: ['Pitch', 'Design'],
  },
  {
    id: 'tsk-3',
    title: 'Renew contracts with Vector Analytics',
    description:
      'Finalize renewal scope, capture feedback, and confirm new pricing schedule.',
    owner: 'Luis Hernandez',
    status: 'review',
    priority: 'medium',
    dueDate: '2025-02-06T17:45:00.000Z',
    updatedAt: '2025-01-28T16:40:00.000Z',
    progress: 82,
    tags: ['Contracts'],
  },
  {
    id: 'tsk-4',
    title: 'Launch quarterly NPS survey',
    description:
      'Schedule emails for active clients and sync responses with Insights team.',
    owner: 'Riya Patel',
    status: 'completed',
    priority: 'low',
    dueDate: '2025-01-22T09:00:00.000Z',
    updatedAt: '2025-01-23T08:15:00.000Z',
    progress: 100,
    tags: ['Research'],
  },
]

export const Route = createLazyFileRoute(
  '/app/_app/business-development/_business-development/task-management',
)({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Manage Tasks | Maintex Pro ',
      },
    ],
  }),
})

function RouteComponent() {
  const [tasks, setTasks] = useState(MOCK_TASKS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [viewMode, setViewMode] = useState('board')
  const [hideCompleted, setHideCompleted] = useState(false)

  const priorities = useMemo(() => {
    return Array.from(new Set(tasks.map((task) => task.priority))).sort()
  }, [tasks])

  const statuses = useMemo(() => {
    return STATUS_ORDER.filter((status) =>
      tasks.some((task) => task.status === status),
    )
  }, [tasks])

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return tasks
      .filter((task) => {
        if (!normalizedSearch) return true
        const haystack = [task.title, task.description, task.owner, task.tags?.join(' ')]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(normalizedSearch)
      })
      .filter((task) => {
        if (statusFilter === 'all') return true
        return task.status === statusFilter
      })
      .filter((task) => {
        if (priorityFilter === 'all') return true
        return task.priority === priorityFilter
      })
      .filter((task) => {
        if (!hideCompleted) return true
        return task.status !== 'completed'
      })
  }, [tasks, searchTerm, statusFilter, priorityFilter, hideCompleted])

  const advanceTaskStatus = (taskId, direction = 'forward') => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task
        const currentIndex = STATUS_ORDER.indexOf(task.status)
        const nextIndex =
          direction === 'forward'
            ? Math.min(currentIndex + 1, STATUS_ORDER.length - 1)
            : Math.max(currentIndex - 1, 0)
        const nextStatus = STATUS_ORDER[nextIndex]
        const nextProgress =
          nextStatus === 'completed'
            ? 100
            : Math.max(task.progress ?? 0, (nextIndex / (STATUS_ORDER.length - 1)) * 100)

        return {
          ...task,
          status: nextStatus,
          progress: Math.round(nextProgress),
        }
      }),
    )
  }

  const resetTaskStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: 'backlog',
              progress: 10,
            }
          : task,
      ),
    )
  }

  const formatDate = (value) => {
    if (!value) return '—'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return '—'
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  const summarisedProgress = useMemo(() => {
    const totals = STATUS_ORDER.reduce(
      (acc, status) => {
        const count = filteredTasks.filter((task) => task.status === status).length
        acc[status] = count
        acc.total += count
        return acc
      },
      { total: 0 },
    )

    return totals
  }, [filteredTasks])

  return (
    <div className="flex h-full w-full flex-col">
      <DashboardBanner
        title="Task management"
        description="Stay on top of business development workflows and keep deals moving forward."
      >
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Plus className="size-4" />
            <span>Quick add task</span>
          </Button>
        </div>
      </DashboardBanner>

      <div className="flex-1 overflow-hidden px-6 pb-6">
        <Card className="h-full border-border/60">
          <CardHeader className="border-b border-border/60 pb-4">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg text-text">Pipeline overview</CardTitle>
                <CardDescription>
                  {summarisedProgress.total} {summarisedProgress.total === 1 ? 'task' : 'tasks'}·
                  {' '}
                  {STATUS_META[statusFilter]?.label ?? 'All stages'}
                </CardDescription>
              </div>
              <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center xl:w-auto">
                <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                  <Input
                    placeholder="Search tasks, owners, or tags"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full"
                  />
                  <div className="flex items-center gap-3">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All stages" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All stages</SelectItem>
                        {STATUS_ORDER.map((status) => (
                          <SelectItem key={status} value={status}>
                            {STATUS_META[status].label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All priorities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All priorities</SelectItem>
                        {priorities.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-bg/60 px-4 py-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-text/55">Hide completed</p>
                    <p className="text-sm text-text/75">Focus on active work only</p>
                  </div>
                  <Switch checked={hideCompleted} onCheckedChange={setHideCompleted} />
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-bg/60 p-1">
                  <Button
                    variant={viewMode === 'board' ? 'outline' : 'ghost'}
                    size="sm"
                    className="gap-2"
                    onClick={() => setViewMode('board')}
                  >
                    <KanbanSquare className="size-4" />
                    Board
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'outline' : 'ghost'}
                    size="sm"
                    className="gap-2"
                    onClick={() => setViewMode('list')}
                  >
                    <ListIcon className="size-4" />
                    List
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {STATUS_ORDER.map((status) => (
                <div
                  key={status}
                  className="rounded-lg border border-border/60 bg-bg-300/10 px-4 py-3"
                >
                  <p className="text-[11px] uppercase tracking-[0.25em] text-text/55">
                    {STATUS_META[status].label}
                  </p>
                  <p className="text-2xl font-semibold text-text">
                    {summarisedProgress[status] ?? 0}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-text/50">Tasks</p>
                </div>
              ))}
            </div>
          </CardHeader>

          <CardContent className="flex h-full flex-col p-0">
            {filteredTasks.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center text-sm text-text/60">
                <p className="text-base font-medium text-text">No tasks match your filters.</p>
                <p className="text-xs text-text/50">
                  Adjust filters or refresh the board to see more activity.
                </p>
              </div>
            ) : viewMode === 'board' ? (
              <ScrollArea className="h-full" scrollHideDelay={240}>
                <div className="grid gap-5 px-6 py-6 md:grid-cols-2 xl:grid-cols-4">
                  {STATUS_ORDER.map((status) => {
                    const columnTasks = filteredTasks.filter((task) => task.status === status)
                    return (
                      <div
                        key={status}
                        className="flex h-full flex-col rounded-xl border border-border/60 bg-bg"
                      >
                        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                          <div>
                            <p className="text-sm font-semibold text-text">
                              {STATUS_META[status].label}
                            </p>
                            <p className="text-[11px] uppercase tracking-[0.25em] text-text/55">
                              {columnTasks.length} {columnTasks.length === 1 ? 'task' : 'tasks'}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`rounded-full px-2 text-[10px] ${STATUS_META[status].badge}`}
                          >
                            {STATUS_META[status].label}
                          </Badge>
                        </div>
                        <div className="flex flex-1 flex-col gap-3 p-4">
                          {columnTasks.length === 0 ? (
                            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/60 bg-bg-300/10 px-4 py-6 text-center text-xs text-text/55">
                              No tasks in this stage.
                            </div>
                          ) : (
                            columnTasks.map((task) => (
                              <div
                                key={task.id}
                                className="flex flex-col gap-3 rounded-xl border border-border/60 bg-bg px-4 py-4"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-sm font-semibold text-text">{task.title}</p>
                                    <p className="text-xs text-text/60">{task.description}</p>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={`rounded-full px-2 text-[10px] uppercase tracking-[0.25em] ${
                                      PRIORITY_META[task.priority]
                                    }`}
                                  >
                                    {(task.priority ?? '').toUpperCase()}
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between text-xs text-text/55">
                                  <span>
                                    Due {formatDate(task.dueDate)} · Updated {formatDate(task.updatedAt)}
                                  </span>
                                  <Badge variant="outline" className="rounded-full px-2 text-[10px] text-text/60">
                                    {task.tags?.[0] ?? 'Task'}
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="size-8 border border-border/50">
                                      <AvatarFallback className="bg-bg-300/30 text-xs font-medium text-text">
                                        {task.owner
                                          .split(' ')
                                          .map((part) => part[0])
                                          .join('')
                                          .slice(0, 2)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="leading-none">
                                      <p className="text-xs font-medium text-text">{task.owner}</p>
                                      <p className="text-[10px] uppercase tracking-[0.25em] text-text/50">
                                        Owner
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex min-w-[120px] flex-col gap-1 text-[11px] text-text/55">
                                    <div className="flex items-center justify-between">
                                      <span>Progress</span>
                                      <span className="font-semibold text-text">{task.progress}%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-border/40">
                                      <div
                                        className="h-2 rounded-full bg-text/60 transition-all"
                                        style={{ width: `${task.progress}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs"
                                    onClick={() => advanceTaskStatus(task.id, 'backward')}
                                    disabled={task.status === STATUS_ORDER[0]}
                                  >
                                    Move back
                                  </Button>
                                  {task.status === 'completed' ? (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs"
                                      onClick={() => resetTaskStatus(task.id)}
                                    >
                                      Reopen
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs"
                                      onClick={() => advanceTaskStatus(task.id, 'forward')}
                                    >
                                      Mark next stage
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            ) : (
              <ScrollArea className="h-full" scrollHideDelay={240}>
                <div className="min-w-full px-6 py-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/40">
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Task
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Owner
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Priority
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Due
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Status
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Progress
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTasks.map((task) => (
                          <TableRow key={task.id} className="border-border/40">
                            <TableCell className="min-w-[240px] py-4">
                              <p className="text-sm font-semibold text-text">{task.title}</p>
                              <p className="text-xs text-text/60">{task.description}</p>
                            </TableCell>
                            <TableCell className="min-w-[160px] py-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="size-8 border border-border/50">
                                  <AvatarFallback className="bg-bg-300/30 text-xs font-medium text-text">
                                    {task.owner
                                      .split(' ')
                                      .map((part) => part[0])
                                      .join('')
                                      .slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm text-text/80">{task.owner}</p>
                                  <p className="text-[10px] uppercase tracking-[0.25em] text-text/50">
                                    Updated {formatDate(task.updatedAt)}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge
                                variant="outline"
                                className={`rounded-full px-3 text-[11px] uppercase tracking-[0.2em] ${
                                  PRIORITY_META[task.priority]
                                }`}
                              >
                                {(task.priority ?? '').toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell className="whitespace-nowrap py-4 text-sm text-text/70">
                              {formatDate(task.dueDate)}
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge
                                variant="outline"
                                className={`rounded-full px-3 text-[11px] uppercase tracking-[0.2em] ${
                                  STATUS_META[task.status].badge
                                }`}
                              >
                                {STATUS_META[task.status].label}
                              </Badge>
                            </TableCell>
                            <TableCell className="min-w-[140px] py-4">
                              <div className="flex items-center gap-2">
                                <div className="h-2 flex-1 rounded-full bg-border/40">
                                  <div
                                    className="h-2 rounded-full bg-text/60"
                                    style={{ width: `${task.progress}%` }}
                                  />
                                </div>
                                <span className="text-sm font-semibold text-text/75">{task.progress}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs"
                                  onClick={() => advanceTaskStatus(task.id, 'backward')}
                                  disabled={task.status === STATUS_ORDER[0]}
                                >
                                  Back
                                </Button>
                                {task.status === 'completed' ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                    onClick={() => resetTaskStatus(task.id)}
                                  >
                                    Reopen
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                    onClick={() => advanceTaskStatus(task.id, 'forward')}
                                  >
                                    Next
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
