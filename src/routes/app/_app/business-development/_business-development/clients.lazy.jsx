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
import DefaultFormModal from '../../../../../components/ui/DefaultFormModal'
import { useForm } from '@tanstack/react-form'
import { InputField, TextareaField } from '@/components/ui/FormComponent'
import SearchBar from '../../../../../components/ui/SearchBar'
import { FolderPlus } from 'lucide-react'

const MOCK_CLIENTS = [
  {
    id: 'cl-8f72a1',
    name: 'Alan Sha Salim',
    clientId: 'CL-001',
    company: 'Maintex Pro',
    email: 'alan.maintenx@example.com',
    phone: '+971 55 123 4567',
    website: 'https://maintex.pro',
    country: 'United Arab Emirates',
    address: 'Building 4, Dubai Silicon Oasis, Dubai',
    status: 'active',
    createdAt: '2025-01-12T09:32:00.000Z',
  },
  {
    id: 'cl-6d41c4',
    name: 'Mira Chen',
    clientId: 'CL-002',
    company: 'Aurora Labs',
    email: 'mira.chen@auroralabs.com',
    phone: '+65 8123 4455',
    website: 'https://auroralabs.com',
    country: 'Singapore',
    address: '12 Marina View, Asia Square, Singapore',
    status: 'prospect',
    createdAt: '2025-01-21T14:08:00.000Z',
  },
  {
    id: 'cl-9a12f0',
    name: 'Luis Hernandez',
    clientId: 'CL-003',
    company: 'Vector Analytics',
    email: 'luis.h@vectoranalytics.co',
    phone: '+52 55 2345 9087',
    website: 'https://vectoranalytics.co',
    country: 'Mexico',
    address: 'Av. Paseo de la Reforma 505, Mexico City',
    status: 'active',
    createdAt: '2024-12-18T10:22:00.000Z',
  },
]

export const Route = createLazyFileRoute(
  '/app/_app/business-development/_business-development/clients',
)({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Manage Clients | Maintex Pro ',
      },
    ],
  }),
})

function RouteComponent() {
  const [clients, setClients] = useState(MOCK_CLIENTS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const form = useForm({
    defaultValues: {
      name: '',
      clientId: '',
      country: '',
      email: '',
      phone: '',
      website: '',
      address: '',
      company: '',
    },
    onSubmit: async ({ value }) => {
      setIsFormLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 380))

      const newClient = {
        ...value,
        id: `cl-${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 6)}`,
        status: 'active',
        createdAt: new Date().toISOString(),
      }

      setClients((prev) => [newClient, ...prev])
      setIsFormLoading(false)
      setIsModalOpen(false)
      form.reset()
    },
  })

  const statuses = useMemo(() => {
    return Array.from(new Set(clients.map((client) => client.status))).sort()
  }, [clients])

  const filteredClients = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return clients
      .filter((client) => {
        if (!normalizedSearch) return true
        const haystack = [client.name, client.company, client.email, client.clientId]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(normalizedSearch)
      })
      .filter((client) => {
        if (statusFilter === 'all') return true
        return client.status === statusFilter
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [clients, searchTerm, statusFilter])

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

  const getInitials = (value) => {
    if (!value) return 'CL'
    const parts = value.split(' ').filter(Boolean)
    if (parts.length >= 2) {
      return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase()
    }
    return value.slice(0, 2).toUpperCase()
  }

  return (
    <div className="flex h-full w-full flex-col">
      <DashboardBanner
        title="Clients"
        description="Monitor client relationships and onboard new partners."
      >
        <div className="flex gap-3">
          <SearchBar />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DefaultFormModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Create client"
            description="Complete the details below to add a new client profile."
            handleSubmit={form.handleSubmit}
            isLoading={isFormLoading}
            classNames={{
              content: 'max-w-[34rem] min-w-[34rem]',
            }}
            button={
              <Button variant="shade" onClick={() => setIsModalOpen(true)}>
                <FolderPlus />
                <span>Create client</span>
              </Button>
            }
          >
            <ScrollArea className="max-h-[68dvh] w-full">
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  form.handleSubmit()
                }}
                className="grid w-full grid-cols-2 gap-x-5 gap-y-6 p-5"
              >
                <form.Field
                  name="name"
                  validators={{
                    onChange: ({ value }) => (value ? undefined : 'Name is required'),
                  }}
                >
                  {(field) => (
                    <InputField
                      label="Client name"
                      name="name"
                      type="text"
                      placeholder="Enter client name"
                      className="col-span-2"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                      error={field?.state?.meta?.errors?.join(', ')}
                      isError={field?.state?.meta?.errors?.length > 0}
                      autoFocus
                    />
                  )}
                </form.Field>

                <form.Field
                  name="clientId"
                  validators={{
                    onChange: ({ value }) => (value ? undefined : 'Client ID is required'),
                  }}
                >
                  {(field) => (
                    <InputField
                      label="Client ID"
                      name="clientId"
                      type="text"
                      placeholder="CL-000"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                      error={field?.state?.meta?.errors?.join(', ')}
                      isError={field?.state?.meta?.errors?.length > 0}
                    />
                  )}
                </form.Field>

                <form.Field name="company">
                  {(field) => (
                    <InputField
                      label="Company"
                      name="company"
                      type="text"
                      placeholder="Company or organization"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  )}
                </form.Field>

                <form.Field name="country">
                  {(field) => (
                    <InputField
                      label="Country"
                      name="country"
                      type="text"
                      placeholder="Country of operation"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  )}
                </form.Field>

                <form.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) =>
                      value && value.includes('@') ? undefined : 'Valid email is required',
                  }}
                >
                  {(field) => (
                    <InputField
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                      error={field?.state?.meta?.errors?.join(', ')}
                      isError={field?.state?.meta?.errors?.length > 0}
                      className="col-span-2"
                    />
                  )}
                </form.Field>

                <form.Field name="phone">
                  {(field) => (
                    <InputField
                      label="Phone"
                      name="phone"
                      type="tel"
                      placeholder="+971 55 123 4567"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  )}
                </form.Field>

                <form.Field name="website">
                  {(field) => (
                    <InputField
                      label="Website"
                      name="website"
                      type="url"
                      placeholder="https://"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  )}
                </form.Field>

                <form.Field name="address">
                  {(field) => (
                    <TextareaField
                      label="Address"
                      name="address"
                      className="col-span-2"
                      placeholder="Street, city, and additional details"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  )}
                </form.Field>
              </form>
            </ScrollArea>
          </DefaultFormModal>
        </div>
      </DashboardBanner>

      <div className="flex-1 overflow-hidden px-6 pb-6">
        <Card className="h-full border-border/60">
          <CardContent className="flex h-full flex-col p-0">
            {filteredClients.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center text-sm text-text/60">
                <p className="text-base font-medium text-text">No clients found.</p>
                <p className="text-xs text-text/50">
                  Adjust your search or clear filters to see more records.
                </p>
              </div>
            ) : (
              <ScrollArea className="h-full" scrollHideDelay={240}>
                <div className="min-w-full px-0 py-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/40">
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Client
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Company
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Contact
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Location
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Website
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Added
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text/60">
                            Status
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredClients.map((client) => (
                          <TableRow key={client.id} className="border-border/40">
                            <TableCell className="min-w-[220px] py-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="size-10 border border-border/50">
                                  <AvatarFallback className="bg-bg-300/30 text-xs font-medium text-text">
                                    {getInitials(client.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                  <p className="text-sm font-semibold text-text">{client.name}</p>
                                  <span className="text-[11px] uppercase tracking-[0.2em] text-text/45">
                                    {client.clientId}
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="min-w-[180px] py-4 text-sm text-text/80">
                              {client.company || '—'}
                            </TableCell>
                            <TableCell className="min-w-[220px] py-4 text-sm text-text/75">
                              <div className="space-y-1">
                                <p>{client.email}</p>
                                <p className="text-xs text-text/55">{client.phone || '—'}</p>
                              </div>
                            </TableCell>
                            <TableCell className="min-w-[180px] py-4 text-sm text-text/75">
                              <div className="space-y-1">
                                <p>{client.country || '—'}</p>
                                <p className="text-xs text-text/55">{client.address || '—'}</p>
                              </div>
                            </TableCell>
                            <TableCell className="min-w-[180px] py-4 text-sm text-text/75">
                              {client.website ? (
                                <a
                                  href={client.website}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-primary underline-offset-2 hover:underline"
                                >
                                  {client.website.replace(/^https?:\/\//, '')}
                                </a>
                              ) : (
                                '—'
                              )}
                            </TableCell>
                            <TableCell className="whitespace-nowrap py-4 text-sm text-text/65">
                              {formatDate(client.createdAt)}
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge
                                variant="outline"
                                className={`rounded-full border-border/70 px-3 text-[11px] uppercase tracking-[0.2em] ${
                                  client.status === 'active'
                                    ? 'text-emerald-400 border-emerald-400/70'
                                    : 'text-text/60'
                                }`}
                              >
                                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                              </Badge>
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
