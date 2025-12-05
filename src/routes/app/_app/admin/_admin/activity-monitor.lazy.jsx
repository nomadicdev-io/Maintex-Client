import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@components/sections/DashboardBanner'
import { useRef, useEffect, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { useTheme } from 'next-themes';
import { useAppControls } from '../../../../../hooks/useAppControls';
import { Globe } from "@/components/ui/globe"
import { GitFork, Globe2, Globe2Icon, GlobeIcon, Group, Logs, MapIcon, Monitor, Users2, Clock, MapPin, Server, User, Smartphone, Laptop } from 'lucide-react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import orbit from '@/api';
import FetchLoader from '@/components/fetch/FetchLoader';
import FetchError from '@/components/fetch/FetchError';
import RouteLoader from '@/components/loaders/RouteLoader';
import { Activity } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import Footer from '../../../../../components/layouts/Footer';
import { Badge } from '@/components/ui/badge';
import { DotBadge } from '@/components/ui/dot-badge';

export const Route = createLazyFileRoute('/app/_app/admin/_admin/activity-monitor')({
  component: RouteComponent,
})

function RouteComponent() {

  const {t} = useTranslation()

  const {data, isLoading, isError, error, isFetched, refetch, isRefetching} = useQuery({
    queryKey: ['admin-activity-monitor',],
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
    staleTime: 60000,
    enabled: true,
    queryFn: async () => {
      try{
        const res = await orbit.get({url: 'admin/activity/logs'})
        if(res?.error) throw res.error

        console.log('ACTIVITY LOGS', res)
        return res

      }catch(error){
        console.log('ACTIVITY LOGS ERROR', error)
        return {
          logs: [],
          message: error.message,
        }
      }
    }
  })

  if(isLoading) return <FetchLoader key="fetch-loader" />

  if(isError) return <FetchError key="fetch-error" error={error} />

  return (
    <ScrollArea className="relative w-full h-full pb-8" scrollHideDelay={300}>
    <div className='relative w-full h-full block'>
      <DashboardBanner title={t('activity-monitor')} description={t('activity-monitor-description')} />
      <LogMap />
      <div className="relative w-full flex h-[50rem] border-b border-border">
        <ActivityLogs data={data?.data}/>
        <ActiveUsers />
        {/* <ActiveCountries /> */}
      </div>
      <Activity mode={isRefetching ? 'visible' : 'hidden'}>
        <RouteLoader key="refetch-loader" />
      </Activity>
    </div>
  </ScrollArea>
  )
}


function LogMap() {

  const mapElement = useRef();
  const map = useRef(null);
  const key = import.meta.env.VITE_TOMTOM_API_KEY;
  const { resolvedTheme } = useTheme();
  
  
  useEffect(() => {
    if (map.current) return;

    map.current = tt.map({
      key: key,
      container: mapElement.current,
      center: [55.2744, 25.1972], // Dubai Downtown coordinates: [longitude, latitude]
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
    <div className='relative w-full flex h-120 border-b border-border'>
      <div
        ref={mapElement}
       className="w-full h-full flex-1 grayscale-120  opacity-75"
      />
      <div className='relative w-120 h-120 flex flex-col bg-bg-300/20 border-s border-s-border overflow-hidden'>
       <img src="/bg-login.png" alt="Background Image" className="absolute inset-0 w-full h-full object-cover scale-120 opacity-70" />
        <div className="relative w-full h-full flex flex-1 items-center justify-center">
          <Globe />
        </div>
      </div>
    </div>
  )
}

function ActivityLogs({data}) {

  const {t} = useTranslation()

  const getMethodVariant = (method) => {
    switch(method) {
      case 'GET': return 'sky';
      case 'POST': return 'amber';
      case 'PUT': return 'sky';
      case 'DELETE': return 'red';
      default: return 'default';
    }
  }

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return dayjs(dateString).format('HH:mm:ss');
  }


  return (
    <div className='relative w-full flex flex-col flex-1 border-b border-border'>
      <div className='relative w-full flex items-center justify-between px-5 py-3 border-b border-border bg-bg-300/50'>
        <h2 className='text-base flex items-center gap-2 font-semibold text-text/70'>
          <Group size={16} className='text-text'/>
          <span>{t('activity-logs')}</span>
        </h2>
      </div>
      <div className='relative w-full h-full flex flex-1 flex-col overflow-y-auto'>
        <ScrollArea className="relative w-full h-full">
          <div className="flex flex-col gap-4 p-5">
            {data?.map((log) => (
              <div 
                key={log._id} 
                className='relative w-full bg-bg-300/50 border border-border-600 rounded-lg p-5 bg-300 transition-colors even:bg-bg-100/50'
              >
                {/* Header Row: Method, Timestamp, User */}
                <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-border/50">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Badge variant={getMethodVariant(log.method)} className="font-semibold text-sm shrink-0">
                      {log.method}
                    </Badge>
                    <DotBadge variant="sky" className="text-base">{log.ip}</DotBadge>

                    
                    <Badge variant="outline">
                      <Clock size={16} className="shrink-0" />
                      <span className="whitespace-nowrap">{formatTime(log.timestamp || log.createdAt)}</span>
                    </Badge>
                    <Badge variant="outline">
                      <span className="whitespace-nowrap">{dayjs(log.createdAt).format('DD MMM YYYY')}</span>
                    </Badge>

                    {log.location?.country && (
                      <Badge variant="outline">
                        <MapPin size={16} className="text-text/50 shrink-0" />
                        <span className=" text-text/70">{log.location.country}</span>
                        {log.location.region && log.location.region !== log.location.country && (
                          <span className=" text-text/50">• {log.location.region}</span>
                        )}
                      </Badge>
                    )}
                    {log.timeZone && (
                      <Badge variant="gray">
                        <GlobeIcon size={16} className="text-text/50 shrink-0" />
                        <span className=" text-text/70">{log.timeZone}</span>
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <User size={16} className="text-text/90 shrink-0" />
                    <span className=" text-text/70 font-medium text-sm">{log.userId}</span>
                  </div>
                </div>

                {/* Main Content: URL and Location */}
                <div className="flex items-center gap-5 justify-between w-full p-2 border border-border-600 rounded-xl bg-bg-100/60">
                  <div className="flex items-center gap-2 min-w-0">
                    <GitFork size={16} className="text-text/30 shrink-0 text-teal-500!" />
                    <span className="text-base font-medium text-text/90 truncate" title={log.url}>
                      {log.url}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap border border-border-600 rounded-lg px-2 py-1">
                  {log.userAgent && (
                    <div className="max-w-80 flex items-center gap-2 ">
                      <span className="text-sm flex-1 text-text/60 truncate block" title={log.userAgent}>
                        {log.userAgent}
                      </span>
                      <Server size={14} className="text-text/80 text-amber-600!" />

                    </div>
                  )}
                  
                    
                  </div>
                </div>

               
              </div>
            ))}
            {(!data || data.length === 0) && (
              <div className="flex items-center justify-center py-12 text-text/50">
                <span className="text-base">No activity logs available</span>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      
    </div>
  )
}

function ActiveUsers() {

  const {t} = useTranslation()

  return (
    <div className='relative border-s border-s-border flex flex-col w-120 border-b border-border border-t '>
      <div className='relative w-full flex items-center justify-between px-5 py-3 border-b border-border bg-bg-300/50'>
        <h2 className='text-base flex items-center gap-2 font-semibold text-text/70'>
          <Users2 size={16} className='text-text'/>
          <span>{t('active-users')}</span></h2>
        </div>
        <div className='relative w-full h-full flex flex-1'>
          <ScrollArea className="relative w-full h-full">
            
          </ScrollArea>
        </div>
    </div>
  )
}

function ActiveCountries() {
  const {t} = useTranslation()
  return (
    <div className='relative flex flex-col w-120 border-s border-s-border border-b border-border'>
      <div className='relative w-full flex items-center justify-between px-5 py-3 border-b border-border bg-bg-300/50'>
        <h2 className='text-base flex items-center gap-2 font-semibold text-text/70'>
        <Globe2Icon size={16} className='text-text'/>
        <span>{t('active-countries')}</span></h2>
      </div>
      <div className='relative w-full h-full flex flex-1'>

      </div>
    </div>
  )
}