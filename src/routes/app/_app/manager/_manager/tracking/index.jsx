import { createFileRoute } from '@tanstack/react-router'
import { useRef, useEffect } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { useTheme } from 'next-themes';
import { useGeoLocation } from '../../../../../../hooks/useGeoLocation';

export const Route = createFileRoute('/app/_app/manager/_manager/tracking/')({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Tracking | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {

  const mapElement = useRef();
  const map = useRef(null);
  const key = import.meta.env.VITE_TOMTOM_API_KEY;
  const {resolvedTheme} = useTheme()
  const {coords} = useGeoLocation()

  useEffect(() => {
    // Initialize the map only once
    if (map.current) return;

    map.current = tt.map({
      key: key,
      container: mapElement.current,
      center: [
        coords?.longitude ?? 55.2708, // Default to Dubai longitude if not available
        coords?.latitude ?? 25.2048   // Default to Dubai latitude if not available
      ],
      zoom: 15,
      style: resolvedTheme === 'dark'
        ? 'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBATXo4V0xxYVJUYnFwQzczQjsdMNQN-bVEXbRiVvaKWIIR/drafts/0.json?key=xfUism8YC3AEJzqGQdwxgGzNOJ5pnEPt'
        : 'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBATXo4V0xxYVJUYnFwQzczQjuI31Xa1jxFLLZNyoHtHEi_/drafts/0.json?key=xfUism8YC3AEJzqGQdwxgGzNOJ5pnEPt'
    });
    
    // Clean up map instance on component unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [key]);

  useEffect(() => {
    if(coords?.longitude && coords?.latitude) {
      map.current.setCenter([coords?.longitude, coords?.latitude])
    }
    map.current.setStyle(resolvedTheme === 'dark' ? 'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBATXo4V0xxYVJUYnFwQzczQjsdMNQN-bVEXbRiVvaKWIIR/drafts/0.json?key=xfUism8YC3AEJzqGQdwxgGzNOJ5pnEPt' : 'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBATXo4V0xxYVJUYnFwQzczQjuI31Xa1jxFLLZNyoHtHEi_/drafts/0.json?key=xfUism8YC3AEJzqGQdwxgGzNOJ5pnEPt')
  }, [resolvedTheme])

  useEffect(() => {
    if(coords?.longitude && coords?.latitude) {
      map.current.setCenter([coords?.longitude, coords?.latitude])
    }
  }, [coords])

  return (
    <div className="relative w-full h-full flex-1 flex flex-col">
      <div
        ref={mapElement}
       className="w-full h-full flex-1"
      />
    </div>
  )
}
