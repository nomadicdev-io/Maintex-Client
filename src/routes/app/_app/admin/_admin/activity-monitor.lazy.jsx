import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@components/sections/DashboardBanner'
import { useRef, useEffect, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { useTheme } from 'next-themes';
import { useAppControls } from '../../../../../hooks/useAppControls';

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
  const { resolvedTheme } = useTheme();
  const getLocation = useAppControls((state) => state.getLocation);
  const [coords, setCoords] = useState({ lat: 37.36765, lng: -121.91599 });

  console.log(coords)
  
  useEffect(() => {
    let ignore = false;
    getLocation()
      .then((loc) => {
        if (!ignore && loc.latitude && loc.longitude) {
          setCoords({ lat: loc.latitude, lng: loc.longitude });
        }
      })
      .catch(() => {
      });
    return () => { ignore = true; }
  }, [getLocation]);

  useEffect(() => {
    if (map.current) return;

    map.current = tt.map({
      key: key,
      container: mapElement.current,
      center: [coords.lng, coords.lat], // Example coordinates
      zoom: 13,
      style: resolvedTheme === 'dark' ? import.meta.env.VITE_TOMTOM_STYLE_DARK : import.meta.env.VITE_TOMTOM_STYLE_LIGHT
    });
    
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
    <div className='relative w-full flex h-110 border-b border-border'>
      <div
        ref={mapElement}
       className="w-full h-full flex-1 grayscale-120 border-e border-e-border"
      />
      <div className='relative w-120 h-120 flex flex-col'>

      </div>
    </div>
  )
}