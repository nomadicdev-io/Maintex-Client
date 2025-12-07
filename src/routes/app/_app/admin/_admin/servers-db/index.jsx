import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import DashboardBanner from '@components/sections/DashboardBanner'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import { Card, CardContent } from '@components/ui/card'
import { Separator } from '@components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  GitPullRequestCreate,
  RefreshCw,
  ServerCog,
  ShieldCheck,
  ActivitySquare,
  HardDrive,
  Database,
  Network,
  Server,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const overviewMetrics = [
  {
    id: 'active',
    label: 'Active Servers',
    value: '7',
    change: '+2.3%',
    descriptor: 'All nodes healthy across 3 regions',
    tone: 'up',
    icon: ServerCog,
  },
  {
    id: 'cpu',
    label: 'Average CPU Load',
    value: '38%',
    change: '-4.1%',
    descriptor: 'Rolling 7d baseline vs target',
    tone: 'down',
    icon: ActivitySquare,
  },
  {
    id: 'storage',
    label: 'Storage Utilisation',
    value: '62%',
    change: '+12%',
    descriptor: '10.4 TB used of 16.7 TB',
    tone: 'up',
    icon: HardDrive,
  },
  {
    id: 'resilience',
    label: 'Incident Free Hours',
    value: '72',
    change: 'Stable',
    descriptor: 'Last alert cleared 3 days ago',
    tone: 'stable',
    icon: ShieldCheck,
  },
]

const capacityTimeline = [
  { label: '00:00', compute: 72, databases: 54, storage: 41 },
  { label: '03:00', compute: 69, databases: 53, storage: 39 },
  { label: '06:00', compute: 74, databases: 56, storage: 43 },
  { label: '09:00', compute: 78, databases: 58, storage: 45 },
  { label: '12:00', compute: 81, databases: 60, storage: 47 },
  { label: '15:00', compute: 76, databases: 57, storage: 44 },
  { label: '18:00', compute: 73, databases: 55, storage: 42 },
  { label: '21:00', compute: 71, databases: 54, storage: 41 },
]

const loadSeries = [
  { label: 'Mon', cpu: 42, memory: 61, network: 35 },
  { label: 'Tue', cpu: 48, memory: 66, network: 39 },
  { label: 'Wed', cpu: 36, memory: 58, network: 33 },
  { label: 'Thu', cpu: 38, memory: 57, network: 31 },
  { label: 'Fri', cpu: 41, memory: 59, network: 34 },
  { label: 'Sat', cpu: 34, memory: 51, network: 28 },
  { label: 'Sun', cpu: 29, memory: 48, network: 26 },
]

const serverFleet = [
  {
    id: 'api-core-01',
    name: 'api-core-01',
    role: 'API Gateway',
    location: 'Frankfurt, DE',
    latency: 128,
    cpu: 41,
    memory: 58,
    uptime: '99.99%',
    status: 'operational',
    spec: 'KVM 16 · Ubuntu 25 · 8vCPU · 16GB · 400GB NVMe',
  },
  {
    id: 'api-worker-02',
    name: 'api-worker-02',
    role: 'API Worker Pool',
    location: 'Paris, FR',
    latency: 136,
    cpu: 47,
    memory: 62,
    uptime: '99.92%',
    status: 'operational',
    spec: 'KVM 8 · Ubuntu 25 · 8vCPU · 16GB · 400GB NVMe',
  },
  {
    id: 'db-mongo-01',
    name: 'db-mongo-01',
    role: 'MongoDB Primary',
    location: 'Amsterdam, NL',
    latency: 96,
    cpu: 39,
    memory: 69,
    uptime: '99.95%',
    status: 'operational',
    spec: 'KVM 8 · Ubuntu 25 · 8vCPU · 16GB · 400GB NVMe',
  },
  {
    id: 'db-redis-01',
    name: 'db-redis-01',
    role: 'Redis Cache Cluster',
    location: 'Frankfurt, DE',
    latency: 64,
    cpu: 28,
    memory: 49,
    uptime: '99.98%',
    status: 'operational',
    spec: 'KVM 4 · Ubuntu 25 · 4vCPU · 8GB · 200GB NVMe',
  },
  {
    id: 'db-postgres-01',
    name: 'db-postgres-01',
    role: 'Postgres Analytics',
    location: 'Zurich, CH',
    latency: 108,
    cpu: 34,
    memory: 57,
    uptime: '99.91%',
    status: 'attention',
    spec: 'KVM 8 · Ubuntu 25 · 8vCPU · 16GB · 400GB NVMe',
  },
  {
    id: 'storage-edge-01',
    name: 'storage-edge-01',
    role: 'Static & MinIO Storage',
    location: 'Frankfurt, DE',
    latency: 72,
    cpu: 31,
    memory: 41,
    uptime: '99.97%',
    status: 'operational',
    spec: 'KVM 8 · Ubuntu 25 · 8vCPU · 16GB · 400GB NVMe',
  },
  {
    id: 'backup-snapshot-01',
    name: 'backup-snapshot-01',
    role: 'Backup & Recovery',
    location: 'Helsinki, FI',
    latency: 142,
    cpu: 22,
    memory: 36,
    uptime: '99.89%',
    status: 'operational',
    spec: 'KVM 4 · Ubuntu 25 · 4vCPU · 8GB · 200GB NVMe',
  },
]

const resourcePanels = [
  {
    id: 'capacity',
    icon: Database,
    label: 'Platform capacity',
    title: 'Workload distribution',
    description: 'Provisioned storage and compute footprint across dedicated clusters.',
    tone: 'ice',
    metrics: [
      { id: 'api', label: 'API cluster', context: 'Ingress and gateway layer', value: '13.4 TB / 18.3 TB', percent: 0.74 },
      { id: 'db', label: 'Database ring', context: 'Mongo, Redis & Postgres footprint', value: '9.2 TB / 14.0 TB', percent: 0.66 },
      { id: 'object', label: 'Object storage', context: 'Static assets & MinIO replication', value: '5.1 TB / 8.0 TB', percent: 0.63 },
      { id: 'backup', label: 'Backup cadence', context: 'Snapshots retained for 45 days', value: '2.9 TB / 4.8 TB', percent: 0.6 },
    ],
  },
  {
    id: 'runtime-health',
    icon: ServerCog,
    label: 'Runtime health',
    title: 'Resource utilisation',
    description: 'Rolling 24h averages across compute, memory and network services.',
    tone: 'slate',
    metrics: [
      { id: 'cpu', label: 'CPU load', context: 'Aggregate across API & worker pools', value: '67%', percent: 0.67 },
      { id: 'memory', label: 'Memory', context: 'Active utilisation of provisioned RAM', value: '61%', percent: 0.61 },
      { id: 'disk', label: 'Disk I/O', context: 'Sustained read/write throughput', value: '82%', percent: 0.82 },
      { id: 'network', label: 'Network TX', context: 'Egress to public & private edges', value: '48%', percent: 0.48 },
    ],
  },
  {
    id: 'resilience',
    icon: ShieldCheck,
    label: 'Resilience posture',
    title: 'Redundancy & recovery',
    description: 'Failover readiness, backup validation and snapshot replication.',
    tone: 'graphite',
    metrics: [
      { id: 'replicas', label: 'Failover replicas', context: 'Warm standby across EU & APAC', value: '3 nodes', percent: 0.86 },
      { id: 'checks', label: 'Backup verification', context: 'Last 7d checksum success rate', value: '98%', percent: 0.98 },
      { id: 'rto', label: 'RTO adherence', context: 'Target recovery under 6 minutes', value: '5m 12s', percent: 0.72 },
      { id: 'alerts', label: 'Open anomalies', context: 'Actionable incidents pending review', value: '2 minor', percent: 0.28 },
    ],
  },
]

const tooltipStyle = {
  backgroundColor: 'rgba(18, 20, 24, 0.92)',
  borderRadius: 16,
  border: '1px solid rgba(120, 120, 128, 0.35)',
  color: '#e4e4e7',
  fontSize: 12,
  padding: '12px 16px',
  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.35)',
}

export const Route = createFileRoute('/app/_app/admin/_admin/servers-db/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ScrollArea className='h-full'>
    <div className='relative flex min-h-full flex-col pb-12'>
      <DashboardBanner
        title={'Servers & Databases'}
        description={'Live view of infrastructure health, capacity and server orchestration for the Maintex Pro platform.'}
        className='backdrop-blur supports-[backdrop-filter]:bg-bg/40'
      >
        <div className='relative flex flex-row items-center gap-3'>
          <Button variant='shade' >
            <GitPullRequestCreate className='size-4' />
            <span>Connect New Server</span>
          </Button>
          <Button variant='shade' >
            <RefreshCw className='size-4' />
            <span>Sync Inventory</span>
          </Button>
        </div>
      </DashboardBanner>

      <main className='relative mx-auto flex w-full  flex-col'>
        <motion.section
          className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
          initial='hidden'
          animate='visible'
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {overviewMetrics.map((metric) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.id}
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                className='h-full'
              >
                <Card className='h-full border-border-600/70 bg-bg-300/45 rounded-none '>
                  <CardContent className='flex h-full flex-col gap-7 rounded-none'>
                    <div className='flex items-start justify-between gap-6'>
                      <div className='flex flex-col gap-4 text-left'>
                        <div className='flex items-center gap-4'>
                          <span className='flex h-12 w-12 items-center justify-center bg-bg-100/40 text-text/80 shadow-inner shadow-black/25'>
                            <Icon className='size-5 text-text/70' />
                          </span>
                          <span className='text-sm font-semibold uppercase tracking-[0.2em] text-text/50 flex-1'>
                            {metric.label}
                          </span>
                        </div>
                        <span className='text-[2.5rem] font-semibold leading-none tracking-tight text-text'>{metric.value}</span>
                        <p className='text-sm leading-relaxed text-text/55'>{metric.descriptor}</p>
                      </div>
                      <Badge
                        variant={metric.tone === 'up' ? 'teal' : metric.tone === 'down' ? 'amber' : 'gray'}
                        className='rounded-full border-border/60 bg-bg-100/40 px-4 py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-text/70'
                      >
                        {metric.change}
                      </Badge>
                    </div>
                    <div className='relative h-2 w-full overflow-hidden rounded-full bg-bg-100/30'>
                      <div
                        className='absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-slate-300/80 via-slate-200/90 to-slate-100'
                        style={{ width: metric.id === 'resilience' ? '92%' : metric.id === 'storage' ? '68%' : metric.id === 'cpu' ? '56%' : '100%' }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.section>

        <motion.section
          className='grid grid-cols-1  xl:grid-cols-2'
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Card className='border-border-600 bg-bg-300/45 rounded-none'>
            <CardContent className='flex flex-col gap-7 rounded-none'>
              <div className='flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between'>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-semibold uppercase tracking-[0.22em] text-text/50'>Capacity overview</p>
                  <h2 className='text-2xl font-semibold text-text'>Provisioned vs consumed footprint</h2>
                  <p className='text-base text-text/55'>Compute, data and storage allocation across the last 24 hours.</p>
                </div>
              </div>
              <div className='relative h-[300px] w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                  <AreaChart data={capacityTimeline} margin={{ left: -10, right: 0, top: 16, bottom: 0 }}>
                    <defs>
                      <linearGradient id='computeCapacity' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#f1f5f9' stopOpacity={0.35} />
                        <stop offset='95%' stopColor='#f1f5f9' stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id='databaseCapacity' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#d8dee9' stopOpacity={0.3} />
                        <stop offset='95%' stopColor='#d8dee9' stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id='storageCapacity' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#cbd5f5' stopOpacity={0.25} />
                        <stop offset='95%' stopColor='#cbd5f5' stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke='rgba(148, 163, 184, 0.08)' strokeDasharray='4 8' vertical={false} />
                    <XAxis dataKey='label' tick={{ fill: 'rgba(212, 212, 216, 0.7)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(212, 212, 216, 0.6)', fontSize: 12 }} axisLine={false} tickLine={false} width={52} unit='%' domain={[0, 100]} />
                    <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#f1f5f9', marginBottom: 4 }} />
                    <Area type='monotone' dataKey='compute' stroke='#f8fafc' strokeWidth={2.2} fillOpacity={1} fill='url(#computeCapacity)' activeDot={{ r: 6 }} />
                    <Area type='monotone' dataKey='databases' stroke='#d8dee9' strokeWidth={2} fillOpacity={1} fill='url(#databaseCapacity)' activeDot={{ r: 6 }} />
                    <Area type='monotone' dataKey='storage' stroke='#cbd5f5' strokeWidth={1.8} fillOpacity={1} fill='url(#storageCapacity)' activeDot={{ r: 6 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className='border-border-600 bg-bg-300/45 rounded-none'>
            <CardContent className='flex h-full flex-col gap-7 rounded-none'>
              <div className='flex flex-col gap-2'>
                <p className='text-sm font-semibold uppercase tracking-[0.22em] text-text/50'>Resource trends</p>
                <h3 className='text-2xl font-semibold text-text'>Load balancing cadence</h3>
                <p className='text-base text-text/55'>CPU, memory and network share across the fleet (7 day).</p>
              </div>
              <div className='relative h-[240px] w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={loadSeries} margin={{ left: -12, right: 12, top: 10, bottom: 4 }}>
                    <CartesianGrid stroke='rgba(148, 163, 184, 0.08)' strokeDasharray='4 8' vertical={false} />
                    <XAxis dataKey='label' tick={{ fill: 'rgba(212, 212, 216, 0.7)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(212, 212, 216, 0.6)', fontSize: 12 }} axisLine={false} tickLine={false} width={36} unit='%' domain={[0, 80]} />
                    <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#f1f5f9', marginBottom: 4 }} />
                    <Line type='monotone' dataKey='cpu' stroke='#f8fafc' strokeWidth={2.2} dot={false} activeDot={{ r: 6 }} />
                    <Line type='monotone' dataKey='memory' stroke='#e5e7eb' strokeWidth={2} strokeDasharray='5 6' dot={false} activeDot={{ r: 6 }} />
                    <Line type='monotone' dataKey='network' stroke='#cbd5f5' strokeWidth={1.8} strokeDasharray='2 8' dot={false} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <Separator className='bg-border/60' />
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <MetricHighlight label='Peak CPU' value='54%' caption='Yesterday at 19:00 UTC' />
                <MetricHighlight label='Cache Hit Rate' value='97%' caption='Redis cluster · 5m rolling' />
                <MetricHighlight label='Average Throughput' value='4.8k req/s' caption='API gateway' />
                <MetricHighlight label='Failover Ready' value='3 replicas' caption='Warm standby capacity' />
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <section className='flex flex-col gap-6'>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
          >
            <Card className='border-border-600 bg-bg-300/45 rounded-none'>
              <CardContent className='flex flex-col rounded-none'>
                <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
                  <div className='flex items-center gap-5 mb-5'>
                    <span className='flex h-14 w-14 items-center justify-center rounded-lg bg-bg-100/40 text-text/80 shadow-inner shadow-black/20'>
                      <Server className='size-6 text-text/75' />
                    </span>
                    <div className='flex flex-col gap-2'>
                      <h3 className='text-2xl font-semibold text-text'>Topology & live vitals</h3>
                    </div>
                  </div>
                  <Badge variant='outline' className='rounded-full border-border px-5 py-2 text-xs uppercase tracking-[0.22em] text-text/65'>Autoscaling guarded</Badge>
                </div>
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
                  {serverFleet.map((server) => (
                    <div key={server.id} className='flex h-full flex-col rounded-lg border border-border-600/80 bg-bg-200/35 p-6 shadow-[0_20px_52px_rgba(4,4,8,0.45)]'>
                      <div className='flex items-start justify-between gap-4'>
                        <div className='flex flex-col gap-1.5'>
                          <p className='text-base font-semibold text-text/80'>{server.name}</p>
                          <span className='text-xs uppercase tracking-[0.26em] text-text/45'>{server.role}</span>
                        </div>
                        <Badge
                          variant={server.status === 'attention' ? 'amber' : 'teal'}
                          className='rounded-full border-border/60 bg-bg-100/40 px-4 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-text/70'
                        >
                          {server.status === 'attention' ? 'Attention' : 'Operational'}
                        </Badge>
                      </div>
                      <p className='mt-4 text-sm leading-relaxed text-text/60'>{server.spec}</p>
                      <div className='mt-6 flex flex-col gap-4 text-sm'>
                        <ServerMetric label='Latency' value={`${server.latency} ms`} />
                        <ServerMetric label='Uptime' value={server.uptime} />
                        <ServerMetric label='CPU Load' value={`${server.cpu}%`} barValue={server.cpu} />
                        <ServerMetric label='Memory' value={`${server.memory}%`} barValue={server.memory} />
                        <div className='flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-text/45'>
                          <Network className='size-3 text-text/60' />
                          {server.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className='grid grid-cols-1 gap-6 xl:grid-cols-3'>
            {resourcePanels.map((panel) => (
              <ResourcePanel key={panel.id} panel={panel} />
            ))}
          </div>
        </section>
      </main>
    </div>
    </ScrollArea>
  )
}

function MetricHighlight({ label, value, caption }) {
  return (
    <div className='flex flex-col gap-2 rounded-xl border border-border-600/60 bg-bg-200/30 px-5 py-4 text-left shadow-[0_16px_40px_rgba(6,6,12,0.35)]'>
      <p className='text-xs uppercase tracking-[0.22em] text-text/50'>{label}</p>
      <p className='text-xl font-semibold text-text'>{value}</p>
      <p className='text-xs text-text/50'>{caption}</p>
    </div>
  )
}

function ServerMetric({ label, value, barValue }) {
  return (
    <div className='flex flex-col gap-1.5 text-sm text-text/65'>
      <div className='flex items-center justify-between text-xs uppercase tracking-[0.22em] text-text/45'>
        <span>{label}</span>
        <span className='text-text/65'>{value}</span>
      </div>
      {typeof barValue === 'number' ? (
        <div className='relative h-2 w-full overflow-hidden rounded-full bg-bg-100/35'>
          <div
            className='absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-50'
            style={{ width: `${barValue}%` }}
          />
        </div>
      ) : null}
    </div>
  )
}

function ResourcePanel({ panel }) {
  const Icon = panel.icon
  return (
    <Card className='border-border-600 bg-bg-300/45 rounded-none'>
      <CardContent className='flex h-full flex-col rounded-none'>
        <div className='flex items-start gap-4'>
          <span className='flex h-12 w-12 items-center justify-center bg-bg-100/35 text-text/80 shadow-inner shadow-black/25'>
            <Icon className='size-5 text-text/70' />
          </span>
          <div className='flex flex-col gap-1'>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-text/50'>{panel.label}</p>
            <h3 className='text-[1.6rem] font-semibold text-text'>{panel.title}</h3>
            <p className='text-sm text-text/55'>{panel.description}</p>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          {panel.metrics.map((metric) => (
            <ResourceMetricRow key={metric.id} metric={metric} tone={panel.tone} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ResourceMetricRow({ metric, tone }) {
  return (
    <div className='flex flex-col gap-2 rounded-xl border border-border-600/60 bg-bg-200/25 px-4 py-4 shadow-[0_16px_40px_rgba(6,6,12,0.35)]'>
      <div className='flex items-start justify-between gap-3 text-sm text-text/70'>
        <div className='flex flex-col gap-1'>
          <span className='text-sm font-medium text-text/80'>{metric.label}</span>
          <span className='text-xs text-text/50'>{metric.context}</span>
        </div>
        <span className='text-sm font-medium text-text/65'>{metric.value}</span>
      </div>
      <StripedMeter percent={metric.percent} tone={tone} />
    </div>
  )
}

function StripedMeter({ percent, tone }) {
  const stripes = 24
  const activeCount = Math.max(0, Math.min(Math.round(percent * stripes), stripes))
  const palette = {
    ice: {
      active: 'linear-gradient(180deg, rgba(226,232,240,0.95) 0%, rgba(226,232,240,0.55) 100%)',
      idle: 'rgba(71, 85, 105, 0.25)',
    },
    slate: {
      active: 'linear-gradient(180deg, rgba(200,200,210,0.9) 0%, rgba(200,200,210,0.5) 100%)',
      idle: 'rgba(63, 63, 70, 0.35)',
    },
    graphite: {
      active: 'linear-gradient(180deg, rgba(229,229,234,0.85) 0%, rgba(229,229,234,0.45) 100%)',
      idle: 'rgba(82, 82, 91, 0.4)',
    },
  }
  const colors = palette[tone] ?? palette.ice

  return (
    <div className='flex gap-[3px] rounded-lg bg-bg-100/20 p-2'>
      {Array.from({ length: stripes }).map((_, index) => (
        <span
          key={index}
          className='h-3 flex-1 rounded-sm'
          style={{ background: index < activeCount ? colors.active : colors.idle }}
        />
      ))}
    </div>
  )
}
