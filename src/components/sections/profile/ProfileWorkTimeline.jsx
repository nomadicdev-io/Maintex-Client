import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "./ProfileWorkTimeline.scss"

const localizer = momentLocalizer(moment)

export default function ProfileWorkTimeline() {
    
  return (
    <div className="relative w-full grid  h-full border-b border-border p-5  mb-10">
      {/* <div className="relative w-full flex items-center justify-between gap-5 ">
      <h2 className="text-xl font-semibold">Work Timeline</h2>
      </div> */}
      <div className="relative w-full h-[30rem] profile-calendar border-e border-e-border">
        <Calendar
          localizer={localizer}
          startAccessor="start"
          defaultDate={new Date()}
          endAccessor="end"
          style={{ height: '100%' }}
          messages={{ weekdays: "Weekdays" }}
          defaultView={'month'}
          views={{day: false, week: true, month: true, year: false}}
        />
      </div>

    </div>
  )
}

