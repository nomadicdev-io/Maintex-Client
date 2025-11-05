import { createLazyFileRoute } from '@tanstack/react-router'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DashboardBanner from '../../../../../components/sections/DashboardBanner'

const localizer = momentLocalizer(moment)

export const Route = createLazyFileRoute('/app/_app/hr/_hr/calendar')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative w-full flex flex-col">
      <DashboardBanner title={'Events Calendar'} description={'Manage your events calendar here.'} />

      <div className="flex-1 relative w-full h-full p-8">
        <Calendar
          localizer={localizer}
          startAccessor="start"
          defaultDate={new Date()}
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  )
}
