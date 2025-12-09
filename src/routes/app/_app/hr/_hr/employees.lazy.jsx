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

      {/* <div className="flex-1 overflow-hidden px-6 pb-6">
        <Card className="h-full border-0">
          <CardContent className="flex h-full flex-col p-0 px-0">
            {
              data?.map((user) => (
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
                            >
                              Email
                              <ArrowUpDown  
                                className={`size-3 transition-transform `}
                              />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap bg-transparent text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            <button
                              type="button"
                              className="flex items-center gap-2"
                            >
                              Role
                              <ArrowUpDown
                                className={`size-3 transition-transform `}
                              />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap bg-transparent text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            <button
                              type="button"
                              className="flex items-center gap-2"
                            >
                              Status
                              <ArrowUpDown
                                className={`size-3 transition-transform `}
                              />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap bg-transparent text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            <button
                              type="button"
                              className="flex items-center gap-2"
                            >
                              Created
                              <ArrowUpDown
                                className={`size-3 transition-transform `}
                              />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap bg-transparent text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            <button
                              type="button"
                              className="flex items-center gap-2"
                            >
                              Updated
                              <ArrowUpDown
                                className={`size-3 transition-transform `}
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
                                    src={user?.image}
                                    alt={user?.name ?? user?.email ?? 'User avatar'}
                                  />
                                  <AvatarFallback className="bg-bg-300/30 text-xs font-medium text-text">
                                    {user?.name?.charAt(0) ?? user?.email?.charAt(0) ?? 'U'}
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
                              {user?.role}
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge
                                variant="outline"
                                className="rounded-full border-border/70 px-3 text-[11px] uppercase tracking-[0.2em] text-text/65"
                              >
                                {user?.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="whitespace-nowrap py-4 text-sm text-text/65">
                              {user?.createdAt}
                            </TableCell>
                            <TableCell className="whitespace-nowrap py-4 text-sm text-text/65">
                              {user?.updatedAt}
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
              ))
            }
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}
