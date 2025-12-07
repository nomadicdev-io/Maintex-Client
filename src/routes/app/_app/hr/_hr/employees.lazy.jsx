import { useMemo, useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../components/sections/DashboardBanner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
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
import InviteUserModal from '@/components/modal/InviteUserModal'
import CreateUserModal from '@/components/modal/CreateUserModal'
import { useQuery } from '@tanstack/react-query'
import { authClient } from '../../../../../auth'
import { ArrowUpDown, Printer, RefreshCw } from 'lucide-react'

export const Route = createLazyFileRoute('/app/_app/hr/_hr/employees')({
  component: RouteComponent,
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
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await authClient.admin.users.list()
      return res.data
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
    placeholderData: (previousData) => previousData ?? { total: 0, users: [] },
  })

  const users = data?.users ?? []
  const total = data?.total ?? users.length

  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [twoFactorOnly, setTwoFactorOnly] = useState(false)
  const [emailVerifiedOnly, setEmailVerifiedOnly] = useState(false)
  const [sortKey, setSortKey] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const sortLabels = {
    name: 'Name',
    email: 'Email',
    role: 'Role',
    status: 'Status',
    createdAt: 'Created',
    updatedAt: 'Updated',
  }

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
      .filter((user) => {
        if (!twoFactorOnly) return true
        return Boolean(user?.twoFactorEnabled)
      })
      .filter((user) => {
        if (!emailVerifiedOnly) return true
        return Boolean(user?.emailVerified)
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
  }, [
    users,
    searchTerm,
    roleFilter,
    statusFilter,
    twoFactorOnly,
    emailVerifiedOnly,
    sortKey,
    sortOrder,
  ])

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

  return (
    <div className="relative w-full flex flex-col h-full">
      <DashboardBanner title={'Employees & User Management'} description={'Manage your employees here.'}>
        <div className="relative flex flex-row items-center gap-2">
          <CreateUserModal />
          <InviteUserModal />
          <Button variant="default">
            <Printer/>
            <span>Generate Report</span>
          </Button>
        </div>
      </DashboardBanner>

      <div className="relative w-full grid grid-cols-[17.5rem_1fr] h-full flex-1">
        <div className="relative w-full h-full border-e border-border">
          <div className="flex h-full flex-col gap-6 p-6">
            <div className="space-y-2">
              <Label
                htmlFor="employee-search"
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-text/60"
              >
                Search directory
              </Label>
              <Input
                id="employee-search"
                placeholder="Search by name, email, or ID"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="border-border bg-bg-300/20 text-sm text-text placeholder:text-text/40 focus-visible:ring-border-600/60"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-medium uppercase tracking-[0.2em] text-text/60">
                Role
              </Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="border-border bg-bg-300/20 text-sm text-text/80 focus:ring-0 focus-visible:ring-border-600/60">
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent className="border-border bg-bg">
                  <SelectItem value="all">All roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-medium uppercase tracking-[0.2em] text-text/60">
                Status
              </Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-border bg-bg-300/20 text-sm text-text/80 focus:ring-0 focus-visible:ring-border-600/60">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent className="border-border bg-bg">
                  <SelectItem value="all">All statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 rounded-lg border border-transparent bg-transparent px-3 py-2 transition hover:border-border/50 hover:bg-bg-300/15">
                <div>
                  <p className="text-xs font-medium text-text">Two-factor enabled</p>
                  <p className="text-[11px] text-text/55">Show users with 2FA turned on</p>
                </div>
                <Switch checked={twoFactorOnly} onCheckedChange={setTwoFactorOnly} />
              </div>
              <div className="flex items-center justify-between gap-3 rounded-lg border border-transparent bg-transparent px-3 py-2 transition hover:border-border/50 hover:bg-bg-300/15">
                <div>
                  <p className="text-xs font-medium text-text">Email verified</p>
                  <p className="text-[11px] text-text/55">Include only verified accounts</p>
                </div>
                <Switch checked={emailVerifiedOnly} onCheckedChange={setEmailVerifiedOnly} />
              </div>
            </div>

            <div className="mt-auto space-y-4">
              <div className="rounded-lg border border-border/60 bg-bg-300/15 p-4 text-xs text-text/55">
                <p>
                  Showing <span className="font-semibold text-text">{filteredUsers.length}</span> of{' '}
                  <span className="font-medium text-text/70">{total}</span> employees
                </p>
                {isRefetching ? (
                  <p className="mt-2 text-[11px] text-text/45">Refreshing directory…</p>
                ) : null}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center"
                onClick={() => refetch()}
                disabled={isRefetching || isLoading}
              >
                <RefreshCw className={`mr-2 size-4 ${isRefetching ? 'animate-spin' : ''}`} />
                Refresh directory
              </Button>
            </div>
          </div>
        </div>
        <ScrollArea className="relative w-full block h-full" scrollHideDelay={300}>
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-text">Employee directory</h2>
                <p className="text-xs text-text/55">
                  {isLoading ? 'Fetching employees…' : `${filteredUsers.length} ${filteredUsers.length === 1 ? 'person' : 'people'} listed`}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-text/45">
                <span>Sort</span>
                <Badge variant="outline" className="rounded-full px-2 text-[11px] uppercase tracking-[0.2em]">
                  {sortLabels[sortKey] ?? 'Name'}
                </Badge>
                <Badge variant="outline" className="rounded-full px-2 text-[11px] uppercase tracking-[0.2em]">
                  {sortOrder === 'asc' ? 'Asc' : 'Desc'}
                </Badge>
              </div>
            </div>

            {isError ? (
              <div className="rounded-lg border border-border/60 bg-bg-300/15 p-6 text-sm text-text/60">
                <p className="font-medium text-text">We couldn’t load employees right now.</p>
                <p className="mt-2 text-text/55">{error?.message ?? 'Please try again in a moment.'}</p>
                <Button className="mt-4" size="sm" onClick={() => refetch()}>
                  Try again
                </Button>
              </div>
            ) : isLoading ? (
              <div className="flex items-center justify-center rounded-lg border border-dashed border-border/60 bg-bg-300/15 py-16 text-sm text-text/55">
                Loading employee directory…
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border/60 bg-bg-300/15 py-16 text-center text-sm text-text/60">
                <p className="text-base font-medium text-text">No employees match your filters.</p>
                <p className="text-xs text-text/50">Adjust your filters or clear the search to see more results.</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    setSearchTerm('')
                    setRoleFilter('all')
                    setStatusFilter('all')
                    setTwoFactorOnly(false)
                    setEmailVerifiedOnly(false)
                  }}
                >
                  Reset filters
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <button
                        type="button"
                        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text/70"
                        onClick={() => handleSort('name')}
                      >
                        Name
                        <ArrowUpDown
                          className={`size-3 transition-transform ${getSortIndicatorClass('name')}`}
                        />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        type="button"
                        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text/70"
                        onClick={() => handleSort('email')}
                      >
                        Email
                        <ArrowUpDown
                          className={`size-3 transition-transform ${getSortIndicatorClass('email')}`}
                        />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        type="button"
                        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text/70"
                        onClick={() => handleSort('role')}
                      >
                        Role
                        <ArrowUpDown
                          className={`size-3 transition-transform ${getSortIndicatorClass('role')}`}
                        />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        type="button"
                        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text/70"
                        onClick={() => handleSort('status')}
                      >
                        Status
                        <ArrowUpDown
                          className={`size-3 transition-transform ${getSortIndicatorClass('status')}`}
                        />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        type="button"
                        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text/70"
                        onClick={() => handleSort('createdAt')}
                      >
                        Created
                        <ArrowUpDown
                          className={`size-3 transition-transform ${getSortIndicatorClass('createdAt')}`}
                        />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        type="button"
                        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text/70"
                        onClick={() => handleSort('updatedAt')}
                      >
                        Updated
                        <ArrowUpDown
                          className={`size-3 transition-transform ${getSortIndicatorClass('updatedAt')}`}
                        />
                      </button>
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-[0.18em] text-text/70">
                      Security
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => {
                    return (
                      <TableRow key={user?.uuid ?? user?.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="size-9 border border-border/50">
                              <AvatarImage src={user?.image?.url} alt={user?.name ?? user?.email ?? 'User'} />
                              <AvatarFallback className="bg-bg-300/40 text-xs font-medium text-text">
                                {getInitials(user?.name, user?.email)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="leading-tight">
                              <p className="text-sm font-semibold text-text">{user?.name ?? 'Unnamed user'}</p>
                              <p className="text-[11px] uppercase tracking-[0.25em] text-text/45">
                                {user?.digitalID ?? user?.uuid ?? '—'}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-text">{user?.email ?? '—'}</p>
                            <div className="flex items-center gap-2 text-xs">
                              <Badge
                                variant="outline"
                                className={`rounded-full px-2 text-[10px] uppercase tracking-[0.3em] ${
                                  user?.emailVerified
                                    ? 'border-emerald-400/60 text-emerald-300'
                                    : 'border-border/70 text-text/50'
                                }`}
                              >
                                {user?.emailVerified ? 'Verified' : 'Unverified'}
                              </Badge>
                              {user?.banned ? (
                                <Badge
                                  variant="outline"
                                  className="rounded-full border-red-400/60 px-2 text-[10px] uppercase tracking-[0.3em] text-red-300"
                                >
                                  Banned
                                </Badge>
                              ) : null}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-text/80">{user?.role ?? '—'}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="rounded-full border-border/70 px-3 text-[11px] uppercase tracking-[0.25em] text-text/70"
                          >
                            {user?.status ?? 'Unknown'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-text/70">{formatDate(user?.createdAt)}</TableCell>
                        <TableCell className="text-sm text-text/70">{formatDate(user?.updatedAt)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.25em] text-text/55">
                            <span className={user?.twoFactorEnabled ? 'text-emerald-300' : 'text-text/50'}>
                              2FA {user?.twoFactorEnabled ? 'On' : 'Off'}
                            </span>
                            <span className={user?.emailVerified ? 'text-emerald-300' : 'text-text/50'}>
                              Email {user?.emailVerified ? 'OK' : 'Pending'}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        </ScrollArea>

      </div>
    </div>
  )
}
