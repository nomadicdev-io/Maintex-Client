import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@components/sections/DashboardBanner'
import { useRef, useEffect } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { useTheme } from 'next-themes';

export const Route = createLazyFileRoute('/app/_app/admin/_admin/activity-monitor')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner title={'Activity Monitor & Logs'} description={'Real-time activity logs for the application. You can see the activity user activities here.'} />
      <LogMap />
    </div>
  )
}


function LogMap() {

  const mapElement = useRef();
  const map = useRef(null);
  const key = import.meta.env.VITE_TOMTOM_API_KEY;
  const {resolvedTheme} = useTheme()

  useEffect(() => {
    // Initialize the map only once
    if (map.current) return;

    map.current = tt.map({
      key: key,
      container: mapElement.current,
      center: [-121.91599, 37.36765], // Example coordinates
      zoom: 13,
      style: resolvedTheme === 'dark' ? import.meta.env.VITE_TOMTOM_STYLE_DARK : import.meta.env.VITE_TOMTOM_STYLE_LIGHT
    });
    
    // Clean up map instance on component unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [key]);


  useEffect(() => {
    map.current.setStyle(resolvedTheme === 'dark' ? import.meta.env.VITE_TOMTOM_STYLE_DARK : import.meta.env.VITE_TOMTOM_STYLE_LIGHT)
  }, [resolvedTheme])

  return (
    <div className='relative w-full flex flex-col h-[25rem] bg-text/5'>
      <div
        ref={mapElement}
       className="w-full h-full flex-1"
      />
    </div>
  )
}