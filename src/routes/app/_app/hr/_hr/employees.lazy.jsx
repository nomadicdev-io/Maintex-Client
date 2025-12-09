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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import InviteUserModal from '@/components/modal/InviteUserModal'
import CreateUserModal from '@/components/modal/CreateUserModal'
import { useQuery } from '@tanstack/react-query'
import { ArrowUpDown, Printer, RefreshCw } from 'lucide-react'
import orbit from '../../../../../api'

export const Route = createLazyFileRoute('/app/_app/hr/_hr/employees')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Employees & User Management | Maintex Pro ',
      },
    ],
  }),
})

function RouteComponent() {
  const {
    data = { total: 0, users: [] },
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await orbit.get({ url: 'hr/list/users' })
      if(res?.error) throw res?.error
      const payload = res?.data ?? {}
      return res?.data
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
    placeholderData: (previousData) => previousData ?? { total: 0, users: [] },
  })

  console.log(data)

  const users = data?.users ?? []
  const total = data?.total ?? users.length

  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortKey, setSortKey] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const roles = useMemo(() => {
    return Array.from(
      new Set(users.map((user) => user?.role).filter(Boolean))
    ).sort((a, b) => String(a).localeCompare(String(b)))
  }, [users])

  const statuses = useMemo(() => {
    return Array.from(
      new Set(users.map((user) => user?.status).filter(Boolean))
    ).sort((a, b) => String(a).localeCompare(String(b)))
  }, [users])

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    const getSortValue = (user) => {
      switch (sortKey) {
        case 'email':
          return (user?.email ?? '').toLowerCase()
        case 'role':
          return (user?.role ?? '').toLowerCase()
        case 'status':
          return (user?.status ?? '').toLowerCase()
        case 'createdAt':
        case 'updatedAt':
          return user?.[sortKey] ? new Date(user[sortKey]).getTime() : 0
        case 'name':
        default:
          return (user?.name ?? '').toLowerCase()
      }
    }

    return [...users]
      .filter((user) => {
        if (!normalizedSearch) return true
        const haystack = [
          user?.name,
          user?.email,
          user?.digitalID,
          user?.uuid,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(normalizedSearch)
      })
      .filter((user) => {
        if (roleFilter === 'all') return true
        return user?.role === roleFilter
      })
      .filter((user) => {
        if (statusFilter === 'all') return true
        return user?.status === statusFilter
      })
      .sort((a, b) => {
        const valueA = getSortValue(a)
        const valueB = getSortValue(b)

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return sortOrder === 'asc' ? valueA - valueB : valueB - valueA
        }

        return sortOrder === 'asc'
          ? String(valueA).localeCompare(String(valueB))
          : String(valueB).localeCompare(String(valueA))
      })
  }, [users, searchTerm, roleFilter, statusFilter, sortKey, sortOrder])

  const handleSort = (key) => {
    setSortOrder((prev) => (sortKey === key && prev === 'asc' ? 'desc' : 'asc'))
    setSortKey(key)
  }

  const getSortIndicatorClass = (key) => {
    if (sortKey !== key) return 'text-text/40'
    return sortOrder === 'asc' ? 'text-text' : 'text-text rotate-180'
  }

  const formatDate = (value) => {
    if (!value) return '—'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return '—'
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  const getInitials = (value, fallback) => {
    if (value) {
      const parts = value.split(' ').filter(Boolean)
      if (parts.length >= 2) {
        return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase()
      }
      return value.slice(0, 2).toUpperCase()
    }
    return (fallback ?? '?').slice(0, 2).toUpperCase()
  }

  const resolveImageSrc = (image) => {
    if (!image) return undefined
    if (typeof image === 'string') return image
    if (image?.url) return image.url
    if (image?.key) return image.key
    return undefined
  }

  const formatLabel = (value) => {
    if (!value) return '—'
    return String(value)
      .split(/[\s_-]+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  }

  return (
    <div className="flex h-full w-full flex-col">
      <DashboardBanner
        title={'Employees & User Management'}
        description={'Manage your employees here.'}
      >
        <div className="flex flex-wrap items-center gap-2">
          <CreateUserModal />
          <InviteUserModal />
          <Button
            variant="whiteShade"
            className="gap-2"
            disabled={isLoading || isRefetching}
            onClick={() => refetch()}
          >
            <Printer className="size-4" />
            <span>Download report</span>
          </Button>
        </div>
      </DashboardBanner>

      <div className="flex-1 overflow-hidden px-6 pb-6">
        <Card className="h-full border-0">
          <CardHeader className="border-b border-border/60 pb-4 px-0">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg text-text">User directory</CardTitle>
                <CardDescription>
                  {isLoading
                    ? 'Fetching employees…'
                    : `${filteredUsers.length} of ${total} ${
                        total === 1 ? 'user' : 'users'
                      }`}
                </CardDescription>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
                <Input
                  id="employee-search"
                  placeholder="Search name, email, or ID"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full sm:w-56"
                />
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="All roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {formatLabel(role)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {formatLabel(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => refetch()}
                  disabled={isRefetching || isLoading}
                >
                  <RefreshCw className={`size-4 ${isRefetching ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex h-full flex-col p-0 px-0">
            {isError ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center">
                <p className="text-base font-semibold text-text">
                  We couldn’t load employees right now.
                </p>
                <p className="text-sm text-text/60">
                  {error?.message ?? 'Please try again in a moment.'}
                </p>
                <Button size="sm" onClick={() => refetch()}>
                  Try again
                </Button>
              </div>
            ) : isLoading ? (
              <div className="flex flex-1 items-center justify-center p-10 text-sm text-text/60">
                Loading user directory…
              </div>
            ) : data?.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center text-sm text-text/60">
                <p className="text-base font-medium text-text">No users found.</p>
                <p className="text-xs text-text/50">
                  Adjust your filters or clear the search to see more results.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('')
                    setRoleFilter('all')
                    setStatusFilter('all')
                  }}
                >
                  Reset filters
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-full" scrollHideDelay={240}>
                <div className="min-w-full px-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/40">
                          <TableHead className="whitespace-nowrap bg-transparent text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            <button
                              type="button"
                              className="flex items-center gap-2"
                              onClick={() => handleSort('name')}
                            >
                              Name
                              <ArrowUpDown
                                className={`size-3 transition-transform ${getSortIndicatorClass('name')}`}
                              />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap bg-transparent text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            <button
                              type="button"
                              className="flex items-center gap-2"
                              onClick={() => handleSort('email')}
                            >
                              Email
                              <ArrowUpDown
                                className={`size-3 transition-transform ${getSortIndicatorClass('email')}`}
                              />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap bg-transparent text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            <button
                              type="button"
                              className="flex items-center gap-2"
                              onClick={() => handleSort('role')}
                            >
                              Role
                              <ArrowUpDown
                                className={`size-3 transition-transform ${getSortIndicatorClass('role')}`}
                              />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap bg-transparent text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            <button
                              type="button"
                              className="flex items-center gap-2"
                              onClick={() => handleSort('status')}
                            >
                              Status
                              <ArrowUpDown
                                className={`size-3 transition-transform ${getSortIndicatorClass('status')}`}
                              />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap bg-transparent text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            <button
                              type="button"
                              className="flex items-center gap-2"
                              onClick={() => handleSort('createdAt')}
                            >
                              Created
                              <ArrowUpDown
                                className={`size-3 transition-transform ${getSortIndicatorClass('createdAt')}`}
                              />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap bg-transparent text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            <button
                              type="button"
                              className="flex items-center gap-2"
                              onClick={() => handleSort('updatedAt')}
                            >
                              Updated
                              <ArrowUpDown
                                className={`size-3 transition-transform ${getSortIndicatorClass('updatedAt')}`}
                              />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap bg-transparent text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Security
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data?.map((user) => (
                          <TableRow
                            key={user?.uuid ?? user?._id ?? user?.id}
                            className="border-border/40"
                          >
                            <TableCell className="min-w-[220px] py-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="size-10 border border-border/50">
                                  <AvatarImage
                                    src={resolveImageSrc(user?.image)}
                                    alt={user?.name ?? user?.email ?? 'User avatar'}
                                  />
                                  <AvatarFallback className="bg-bg-300/30 text-xs font-medium text-text">
                                    {getInitials(user?.name, user?.email)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                  <p className="text-sm font-semibold text-text">
                                    {user?.name ?? 'Unnamed user'}
                                  </p>
                                  <p className="text-[11px] uppercase tracking-[0.2em] text-text/45">
                                    {user?.digitalID ?? user?.uuid ?? '—'}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="min-w-[220px] py-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-text">
                                  {user?.email ?? '—'}
                                </p>
                                <Badge
                                  variant="outline"
                                  className={`rounded-full px-2 text-[10px] uppercase tracking-[0.25em] ${
                                    user?.emailVerified
                                      ? 'border-emerald-400/70 text-emerald-400'
                                      : 'border-border/70 text-text/50'
                                  }`}
                                >
                                  {user?.emailVerified ? 'Verified' : 'Unverified'}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap py-4 text-sm text-text/80">
                              {formatLabel(user?.role)}
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge
                                variant="outline"
                                className="rounded-full border-border/70 px-3 text-[11px] uppercase tracking-[0.2em] text-text/65"
                              >
                                {formatLabel(user?.status)}
                              </Badge>
                            </TableCell>
                            <TableCell className="whitespace-nowrap py-4 text-sm text-text/65">
                              {formatDate(user?.createdAt)}
                            </TableCell>
                            <TableCell className="whitespace-nowrap py-4 text-sm text-text/65">
                              {formatDate(user?.updatedAt)}
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.2em] text-text/55">
                                <span className={user?.twoFactorEnabled ? 'text-emerald-400' : 'text-text/40'}>
                                  2FA {user?.twoFactorEnabled ? 'On' : 'Off'}
                                </span>
                                <span className={user?.emailVerified ? 'text-emerald-400' : 'text-text/40'}>
                                  Email {user?.emailVerified ? 'OK' : 'Pending'}
                                </span>
                                {user?.banned ? <span className="text-red-400">Banned</span> : null}
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
