import { createLazyFileRoute, useRouteContext, useRouter } from '@tanstack/react-router'
import { authClient } from '@auth'
import ProfileInfo from '@/components/sections/profile/ProfileInfo'
import DashboardBanner from '@/components/sections/DashboardBanner'
import { Separator } from '@/components/ui/separator'
import {LogOutIcon, UserPen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/hooks/useAuthStore'

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
  const logout = useAuthStore((state) => state.logout)

  const quickStats = [
    {
      id: 'projects',
      title: 'Total projects',
      value: '18',
      meta: '4 active · 2 on hold',
    },
    {
      id: 'tasks',
      title: 'Pending tasks',
      value: '32',
      meta: '7 due this week',
    },
    {
      id: 'deadlines',
      title: 'Upcoming deadlines',
      value: '5',
      meta: 'Next: Strategy rollout (Apr 22)',
    },
    {
      id: 'leave',
      title: 'Leave balance',
      value: '12.5 days',
      meta: 'Last leave taken Mar 04',
    },
  ]

  const skillset = {
    skills: [
      { name: 'Product Strategy', level: 'Expert' },
      { name: 'Sprint Facilitation', level: 'Advanced' },
      { name: 'Stakeholder Alignment', level: 'Advanced' },
      { name: 'UX Research', level: 'Intermediate' },
      { name: 'Data Storytelling', level: 'Intermediate' },
    ],
    certifications: [
      'PMP Certified – PMI (2023)',
      'Certified Scrum Master – Scrum Alliance (2022)',
      'Leading SAFe® – Scaled Agile (2021)',
    ],
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'Spanish', level: 'Professional' },
      { name: 'Arabic', level: 'Conversational' },
    ],
  }

  const currentProjects = [
    {
      name: 'Customer Success 2.0',
      role: 'Program Lead',
      status: 'On track',
      detail: '73% complete · launch window Jun 2025',
    },
    {
      name: 'Mobile App Revamp',
      role: 'Delivery Manager',
      status: 'Slight delay',
      detail: 'Milestone Beta-3 due Apr 25',
    },
  ]

  const pastProjects = [
    {
      label: 'Workplace Automation',
      result: 'Delivered Q4 · 14% cost savings',
    },
    {
      label: 'Analytics Enablement',
      result: 'Delivered Q2 · 3.6M MAU impact',
    },
    {
      label: 'Vendor Migration',
      result: 'Delivered Q1 · Reduced MTTR by 27%',
    },
  ]

  const contributionMetrics = [
    { label: 'Tasks completed', value: '428' },
    { label: 'Milestones led', value: '36' },
    { label: 'Cross-team workshops', value: '24' },
    { label: 'Ideas adopted', value: '11' },
  ]

  const performanceTimeline = [
    {
      title: 'FY2024 Performance Review',
      detail: 'Rating: Exceeds Expectations – strategic leadership focus.',
      date: 'Jan 2025',
    },
    {
      title: 'Growth Plan Refresh',
      detail: 'New objectives set around analytics enablement and mentoring.',
      date: 'Sep 2024',
    },
    {
      title: 'Mid-year Alignment',
      detail: 'Met 3/4 OKRs; additional stretch target added for Q4.',
      date: 'Jun 2024',
    },
  ]

  const goals = [
    {
      title: 'Launch unified reporting workspace',
      status: 'On track',
      due: 'Q2 2025',
    },
    {
      title: 'Mentor 5 emerging PMs across org',
      status: 'In progress',
      due: 'Q3 2025',
    },
    {
      title: 'Release retention playbook for enterprise accounts',
      status: 'Planning',
      due: 'Q4 2025',
    },
  ]

  const trainingHistory = [
    {
      title: 'Advanced Story Mapping',
      provider: 'Miro Academy',
      date: 'Mar 2025',
    },
    {
      title: 'Strategic Negotiation Lab',
      provider: 'Harvard Online',
      date: 'Dec 2024',
    },
    {
      title: 'AI for Product Leaders',
      provider: 'Product Faculty',
      date: 'Aug 2024',
    },
  ]

  const attendanceLog = [
    { date: 'Apr 18', in: '08:54', out: '17:36', notes: 'Team onsite sync' },
    { date: 'Apr 17', in: '09:05', out: '18:02', notes: 'Client workshops' },
    { date: 'Apr 16', in: '08:48', out: '17:10', notes: 'Focus day' },
  ]

  const leaveRequests = [
    { type: 'Annual leave', period: 'Apr 29 – May 02', status: 'Approved' },
    { type: 'Work from home', period: 'Apr 12', status: 'Logged' },
    { type: 'Medical leave', period: 'Mar 14', status: 'Approved' },
  ]

  const timesheetSummary = [
    { label: 'Billable hours', value: '116h', meta: 'This month' },
    { label: 'Non-billable', value: '24h', meta: 'Workshops & training' },
    { label: 'Utilization', value: '82%', meta: '+4% vs last month' },
  ]

  const documentVault = {
    payslips: ['Mar 2025', 'Feb 2025', 'Jan 2025', 'Dec 2024'],
    certificates: ['PMP Credential.pdf', 'Scrum Master.pdf', 'Leadership Lab.pdf'],
    hrDocs: ['Employment contract.pdf', 'Last appraisal.pdf', 'Emergency contacts.pdf'],
  }

  const activityTimeline = [
    {
      title: 'Approved project change request',
      detail: 'Customer Success 2.0 – Scope updated for rollout phase 3.',
      time: 'Today · 11:24',
      tone: 'accent',
    },
    {
      title: 'Timesheet submitted',
      detail: 'Week 15 · 40h billable, 4h training.',
      time: 'Yesterday · 18:05',
      tone: 'muted',
    },
    {
      title: 'Leave request approved',
      detail: 'Annual leave: Apr 29 – May 02 · Approved by HR.',
      time: 'Apr 16 · 09:12',
      tone: 'success',
    },
    {
      title: 'Performance feedback added',
      detail: '360 review from Marketing Director uploaded.',
      time: 'Apr 10 · 16:41',
      tone: 'accent',
    },
  ]

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
          <Button variant='shade' onClick={logout}>
            <LogOutIcon />
            <span>{t('log-out')}</span>
          </Button>
        </div>
      </DashboardBanner>

      {data?.user ? (
        <div className='flex flex-col px-6 pb-12 text-text'>
          <div className='border border-border-600/70 bg-bg-300/30'>
            <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'>
              {quickStats.map((item, index) => {
                const classes = [
                  'bg-bg p-6 text-sm uppercase tracking-[0.18em] text-text/55',
                  'border-t border-border-600/70',
                ]

                if (index === 0) {
                  classes.push('border-t-0')
                }

                if (index % 2 === 1) {
                  classes.push('sm:border-l sm:border-border-600/70')
                }

                if (index < 2) {
                  classes.push('sm:border-t-0')
                } else {
                  classes.push('sm:border-t sm:border-border-600/70')
                }

                if (index > 0) {
                  classes.push('xl:border-l xl:border-border-600/70')
                }

                classes.push('xl:border-t-0')

                return (
                  <div key={item.id} className={classes.join(' ')}>
                    <p>{item.title}</p>
                    <p className='mt-2 text-3xl font-semibold tracking-normal text-text'>{item.value}</p>
                    <p className='mt-1 text-xs normal-case tracking-normal text-text/60'>{item.meta}</p>
                  </div>
                )
              })}
            </section>

            <div className='grid grid-cols-1 xl:grid-cols-[380px_auto] border-t border-border-600/70'>
              <div className='flex flex-col'>
                <div className='border-b border-border-600/70 p-6'>
                  <ProfileInfo user={data.user} refetch={refetch} />
                </div>

                <div className='border-b border-border-600/70 p-6'>
                  <header className='mb-4 flex items-center justify-between text-sm'>
                    <h2 className='font-semibold uppercase tracking-[0.22em] text-text/60'>Skills & expertise</h2>
                    <span className='text-xs uppercase tracking-[0.22em] text-text/45'>Updated Mar 2025</span>
                  </header>
                  <div className='space-y-4 text-sm'>
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.22em] text-text/55'>Core skills</p>
                      <div className='mt-3 flex flex-wrap'>
                        {skillset.skills.map((skill, idx) => (
                          <span
                            key={skill.name}
                            className={`border border-border-600/70 bg-bg-100/20 px-3 py-2 text-xs uppercase tracking-[0.22em] text-text/60 ${
                              idx === 0 ? '' : 'ml-[1px] mt-[1px]'
                            }`}
                          >
                            {skill.name}
                            <span className='ml-2 text-[0.65rem] text-text/45'>{skill.level}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.22em] text-text/55'>Certifications</p>
                      <ul className='mt-3 space-y-2 text-text/70'>
                        {skillset.certifications.map((cert) => (
                          <li key={cert}>• {cert}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.22em] text-text/55'>Languages</p>
                      <div className='mt-3 grid grid-cols-1 sm:grid-cols-2'>
                        {skillset.languages.map((language, idx) => (
                          <div
                            key={language.name}
                            className={`border border-border-600/70 bg-bg-100/20 px-3 py-3 text-sm text-text/70 ${
                              idx % 2 === 1 ? 'sm:ml-[1px]' : ''
                            } ${idx >= 2 ? 'mt-[1px]' : ''}`}
                          >
                            <div className='flex items-center justify-between'>
                              <span>{language.name}</span>
                              <span className='text-xs uppercase tracking-[0.22em] text-text/45'>{language.level}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-6 text-sm text-text/70'>
                  <header className='mb-4 flex items-center justify-between text-sm'>
                    <h2 className='font-semibold uppercase tracking-[0.22em] text-text/60'>Document vault</h2>
                    <span className='text-xs uppercase tracking-[0.22em] text-text/45'>Last sync Apr 15</span>
                  </header>
                  <div className='space-y-4'>
                    <DocumentList title='Payslips' items={documentVault.payslips} />
                    <DocumentList title='Certificates' items={documentVault.certificates} />
                    <DocumentList title='HR documents' items={documentVault.hrDocs} />
                  </div>
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='border-b border-border-600/70 p-6'>
                  <header className='mb-4 flex items-center justify-between text-sm'>
                    <h2 className='font-semibold uppercase tracking-[0.22em] text-text/60'>Project portfolio</h2>
                    <span className='text-xs uppercase tracking-[0.22em] text-text/45'>Updated weekly</span>
                  </header>
                  <div className='space-y-6 text-sm text-text/70'>
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.22em] text-text/55'>Current projects</p>
                      <div className='mt-3 grid grid-cols-1 lg:grid-cols-2'>
                        {currentProjects.map((project, idx) => (
                          <div
                            key={project.name}
                            className={`border border-border-600/70 bg-bg-100/20 px-4 py-4 ${idx % 2 === 1 ? 'lg:ml-[1px]' : ''}`}
                          >
                            <p className='font-medium text-text'>{project.name}</p>
                            <p className='text-xs uppercase tracking-[0.22em] text-text/50'>{project.role}</p>
                            <p className='mt-2 text-sm text-text/60'>{project.status} · {project.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator className='bg-border/70' />
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.22em] text-text/55'>Past highlights</p>
                      <ul className='mt-3 space-y-2'>
                        {pastProjects.map((project) => (
                          <li key={project.label}>• {project.label} — {project.result}</li>
                        ))}
                      </ul>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2'>
                      {contributionMetrics.map((metric, idx) => (
                        <div
                          key={metric.label}
                          className={`border border-border-600/70 bg-bg-100/20 px-4 py-4 text-sm text-text ${idx % 2 === 1 ? 'sm:ml-[1px]' : ''} ${idx >= 2 ? 'mt-[1px]' : ''}`}
                        >
                          <p className='text-xs uppercase tracking-[0.22em] text-text/50'>{metric.label}</p>
                          <p className='mt-2 text-2xl font-semibold text-text'>{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='border-b border-border-600/70 p-6'>
                  <header className='mb-4 flex items-center justify-between text-sm'>
                    <h2 className='font-semibold uppercase tracking-[0.22em] text-text/60'>Performance & HR records</h2>
                    <span className='text-xs uppercase tracking-[0.22em] text-text/45'>FY2025 cycle</span>
                  </header>
                  <div className='grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]'>
                    <div className='border border-border-600/70 bg-bg-100/15 p-5 text-sm text-text/70 lg:border-0 lg:border-r lg:border-border-600/70'>
                      <p className='text-xs font-semibold uppercase tracking-[0.22em] text-text/55'>Performance timeline</p>
                      <div className='mt-4 space-y-4'>
                        {performanceTimeline.map((event) => (
                          <div key={event.title} className='relative border-l border-border-600/70 pl-6'>
                            <span className='absolute -left-[6px] top-[6px] size-3 bg-text/70' />
                            <p className='text-sm font-semibold text-text'>{event.title}</p>
                            <p className='text-sm text-text/60'>{event.detail}</p>
                            <p className='text-xs uppercase tracking-[0.2em] text-text/45'>{event.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='border-t border-border-600/70 bg-bg-100/20 p-5 text-sm text-text/70 lg:border-0 lg:border-l lg:border-border-600/70'>
                      <p className='text-xs font-semibold uppercase tracking-[0.22em] text-text/55'>Goals & development</p>
                      <div className='mt-3 space-y-3'>
                        {goals.map((goal) => (
                          <div key={goal.title} className='border border-border-600/70 bg-bg px-3 py-3 text-sm text-text/70'>
                            <p className='font-medium text-text'>{goal.title}</p>
                            <p className='text-xs uppercase tracking-[0.2em] text-text/50'>{goal.status} · {goal.due}</p>
                          </div>
                        ))}
                      </div>
                      <Separator className='my-4 bg-border/60' />
                      <p className='text-xs font-semibold uppercase tracking-[0.22em] text-text/55'>Training & learning</p>
                      <ul className='mt-3 space-y-2'>
                        {trainingHistory.map((session) => (
                          <li key={session.title} className='flex items-start justify-between gap-4'>
                            <div>
                              <p className='font-medium text-text'>{session.title}</p>
                              <p className='text-xs uppercase tracking-[0.2em] text-text/50'>{session.provider}</p>
                            </div>
                            <span className='text-xs uppercase tracking-[0.2em] text-text/45'>{session.date}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='border-b border-border-600/70 p-6'>
                  <header className='mb-4 flex items-center justify-between text-sm'>
                    <h2 className='font-semibold uppercase tracking-[0.22em] text-text/60'>Attendance & timesheet</h2>
                    <span className='text-xs uppercase tracking-[0.22em] text-text/45'>Week 16 focus</span>
                  </header>
                  <div className='grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr]'>
                    <div className='border border-border-600/70 bg-bg-100/15 p-0 xl:border-0 xl:border-r xl:border-border-600/70'>
                      <AttendanceTable rows={attendanceLog} />
                    </div>
                    <div className='border-t border-border-600/70 bg-bg-100/20 p-5 text-sm text-text/70 xl:border-0 xl:border-l xl:border-border-600/70'>
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-text/55'>Leave requests</p>
                        <div className='mt-3 space-y-2'>
                          {leaveRequests.map((request) => (
                            <div key={request.period} className='border border-border-600/70 bg-bg px-3 py-2'>
                              <p className='font-medium text-text'>{request.type}</p>
                              <p className='text-xs uppercase tracking-[0.2em] text-text/50'>{request.period}</p>
                              <p className='text-xs text-text/55'>{request.status}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Separator className='my-4 bg-border/60' />
                      <div className='space-y-2'>
                        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-text/55'>Timesheet summary</p>
                        {timesheetSummary.map((item) => (
                          <div key={item.label} className='border border-border-600/70 bg-bg px-3 py-3'>
                            <p className='text-xs uppercase tracking-[0.2em] text-text/50'>{item.label}</p>
                            <p className='text-lg font-semibold text-text'>{item.value}</p>
                            <p className='text-xs text-text/55'>{item.meta}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-6'>
                  <header className='mb-4 flex items-center justify-between text-sm'>
                    <h2 className='font-semibold uppercase tracking-[0.22em] text-text/60'>Activity timeline</h2>
                    <span className='text-xs uppercase tracking-[0.22em] text-text/45'>Last 10 events</span>
                  </header>
                  <div className='space-y-4 text-sm text-text/70'>
                    {activityTimeline.map((item, idx) => (
                      <div key={item.title} className={`relative border-l border-border-600/70 pl-6 ${idx !== 0 ? 'pt-2' : ''}`}>
                        <span
                          className={`absolute -left-[6px] top-[6px] size-3 ${
                            item.tone === 'success'
                              ? 'bg-success/80'
                              : item.tone === 'muted'
                              ? 'bg-border-600/80'
                              : 'bg-text/70'
                          }`}
                        />
                        <p className='text-sm font-semibold text-text'>{item.title}</p>
                        <p className='text-sm text-text/60'>{item.detail}</p>
                        <p className='text-xs uppercase tracking-[0.2em] text-text/45'>{item.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function DocumentList({ title, items }) {
  return (
    <div>
      <p className='text-xs font-semibold uppercase tracking-[0.22em] text-text/55'>{title}</p>
      <ul className='mt-3 space-y-2 text-sm text-text/70'>
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  )
}

function AttendanceTable({ rows }) {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full border-collapse text-sm text-text/70'>
        <thead className='bg-bg-100/25 text-xs uppercase tracking-[0.22em] text-text/50'>
          <tr>
            <th className='border-b border-border-600/70 px-3 py-2 text-left font-normal'>Date</th>
            <th className='border-b border-border-600/70 px-3 py-2 text-left font-normal'>Clock-in</th>
            <th className='border-b border-border-600/70 px-3 py-2 text-left font-normal'>Clock-out</th>
            <th className='border-b border-border-600/70 px-3 py-2 text-left font-normal'>Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((entry) => (
            <tr key={entry.date} className='border-b border-border-600/70 last:border-b-0'>
              <td className='px-3 py-2 font-medium text-text'>{entry.date}</td>
              <td className='px-3 py-2'>{entry.in}</td>
              <td className='px-3 py-2'>{entry.out}</td>
              <td className='px-3 py-2 text-text/60'>{entry.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
