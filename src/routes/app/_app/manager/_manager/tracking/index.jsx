import { createFileRoute } from '@tanstack/react-router'
import { useRef, useEffect } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { useTheme } from 'next-themes';

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

  useEffect(() => {
    // Initialize the map only once
    if (map.current) return;

    map.current = tt.map({
      key: key,
      container: mapElement.current,
      center: [55.26440, 25.18667], // Example coordinates
      zoom: 15,
      style: resolvedTheme === 'dark' ? 'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBATXo4V0xxYVJUYnFwQzczQjsSlGBb82NP06dMxJ-idY7Q/drafts/0.json?key=xfUism8YC3AEJzqGQdwxgGzNOJ5pnEPt' : 'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBATXo4V0xxYVJUYnFwQzczQjuI31Xa1jxFLLZNyoHtHEi_/drafts/0.json?key=xfUism8YC3AEJzqGQdwxgGzNOJ5pnEPt'
    });
    
    // Clean up map instance on component unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [key]);

  useEffect(() => {
    map.current.setStyle(resolvedTheme === 'dark' ? 'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBATXo4V0xxYVJUYnFwQzczQjsSlGBb82NP06dMxJ-idY7Q/drafts/0.json?key=xfUism8YC3AEJzqGQdwxgGzNOJ5pnEPt' : 'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBATXo4V0xxYVJUYnFwQzczQjuI31Xa1jxFLLZNyoHtHEi_/drafts/0.json?key=xfUism8YC3AEJzqGQdwxgGzNOJ5pnEPt')
  }, [resolvedTheme])

  return (
    <div className="relative w-full h-full flex-1 flex flex-col">
      <div
        ref={mapElement}
       className="w-full h-full flex-1"
      />
    </div>
  )
}
