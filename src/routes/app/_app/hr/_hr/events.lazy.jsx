import { createLazyFileRoute } from '@tanstack/react-router'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DashboardBanner from '../../../../../components/sections/DashboardBanner'
import { EventCalendar } from "@/components/event-calendar";
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';


export const Route = createLazyFileRoute('/app/_app/hr/_hr/events')({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Events & Schedules | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {

  const [events, setEvents] = useState([]);

  const handleEventAdd = (event) => {
    setEvents([...events, event]);
  };

  const handleEventUpdate = (updatedEvent) => {
    setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
  };

  const handleEventDelete = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <ScrollArea className="relative w-full flex flex-col">
    <div className="relative w-full flex flex-col">
      <DashboardBanner title={'Events & Schedules'} description={'Manage your events and schedules here.'} />

      <div className="flex-1 relative w-full h-full">
        <EventCalendar
          events={events}
          onEventAdd={handleEventAdd}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
          initialView="month"
        />
      </div>
    </div>
    </ScrollArea>
  )
}
