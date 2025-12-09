import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@components/sections/DashboardBanner'
import { useRef, useEffect, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { useTheme } from 'next-themes';
import { Globe } from "@/components/ui/globe"
import { GitFork, Globe2Icon, Users2, Clock, Server, User, Smartphone, Laptop, Terminal, Group } from 'lucide-react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import orbit from '@/api';
import FetchLoader from '@/components/fetch/FetchLoader';
import FetchError from '@/components/fetch/FetchError';
import RouteLoader from '@/components/loaders/RouteLoader';
import { Activity } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { DotBadge } from '@/components/ui/dot-badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { atom, useAtom } from 'jotai';
import { LazyLog, ScrollFollow } from "@melloware/react-logviewer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useWebSocketChannel } from '../../../../../hooks/useWebSocket';


const viewFullLogsAtom = atom(false)

export const Route = createLazyFileRoute('/app/_app/admin/_admin/activity-monitor')({
  component: RouteComponent,
})

function RouteComponent() {

  const {t} = useTranslation()
  const [view, setView] = useAtom(viewFullLogsAtom)
  const [activeUsers, setActiveUsers] = useState([])

  const { isConnected, lastMessage, sendMessage } = useWebSocketChannel(
    import.meta.env.VITE_SOCKET_URL,
    'activity-logs',
    {
      reconnect: true,
      reconnectInterval: 3000,
      reconnectAttempts: 5,
      onMessage: (data) => {
        console.log('Received:', data);

        if(data?.type === 'active-users') {
          setActiveUsers(data.data)
        }
      },
      onConnect: () => {
        console.log('Successfully connected to channel');
      },
      onError: (err) => {
        console.error('Connection error:', err);
      }
    }
  );


  const {data, isLoading, isError, error, isRefetching} = useQuery({
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
    <div className='relative w-full h-full flex flex-col overflow-hidden'>
      <DashboardBanner title={t('activity-monitor')} description={t('activity-monitor-description')}>
        <div className="relative flex flex-row items-center gap-2">
          <Button variant="shade" onClick={() => setView(true)}>
             <GitFork size={14}  />
            <span>{t('view-full-logs')}</span>
          </Button>
        </div>
      </DashboardBanner>
      <ScrollArea className="relative w-full  min-h-0" scrollHideDelay={300}>
        <div className="relative w-full overflow-hidden">
          <LogMap />
        </div>
        <div className="relative w-full flex flex-1 min-h-0 border-b border-border">
          <ActivityLogs data={data?.data}/>
          {/* <ActivityLogger data={data?.data}/> */}
          <ActiveUsers />
          {/* <ActiveCountries /> */}
        </div>
        <Activity mode={isRefetching ? 'visible' : 'hidden'}>
          <RouteLoader key="refetch-loader" />
        </Activity>
      </ScrollArea>
      <Activity mode={view ? 'visible' : 'hidden'}>
        <ViewFullLogs />
      </Activity>
    </div>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);


  useEffect(() => {
    if (!map.current) return;
    map.current.setStyle(resolvedTheme === 'dark' ? import.meta.env.VITE_TOMTOM_STYLE_DARK : import.meta.env.VITE_TOMTOM_STYLE_LIGHT)
  }, [resolvedTheme])

  return (
    <div className='relative w-full flex items-center justify-between h-120 border-b border-border'>

      <div className="relative w-full h-full flex-1">
        <div
          ref={mapElement}
          className="absolute inset-0 w-full h-full grayscale-120 opacity-75 overflow-hidden relative"
        />
      </div>

      <div className='relative w-120 h-120 flex flex-col bg-bgborder-s border-s-border overflow-hidden'>
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
      case 'GET': return <p className="text-base text-sky-500">GET</p>;
      case 'POST': return <p className="text-base text-amber-500">POST</p>;
      case 'PUT': return <p className="text-base text-sky-500">PUT</p>;
      case 'DELETE': return <p className="text-base text-red-500">DELETE</p>;
      default: return <p className="text-base text-text/50">N/A</p>;
    }
  }

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return dayjs(dateString).format('HH:mm:ss');
  }


  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return dayjs(dateString).format('DD MMM YYYY');
  }

  const getDeviceIcon = (userAgent) => {
    if (!userAgent) return <Server size={14} className="text-text/50" />;
    const ua = userAgent.toLowerCase();
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
      return <Smartphone size={14} className="text-amber-500" />;
    }
    if (ua.includes('tablet') || ua.includes('ipad')) {
      return <Smartphone size={14} className="text-blue-500" />;
    }
    return <Laptop size={14} className="text-sky-500" />;
  }

  return (
    <div className='relative w-full flex flex-col flex-1 min-h-0 border-b border-border overflow-hidden'>
      <div className='relative w-full flex items-center justify-between px-5 py-3 border-b border-border bg-bg-300/50 shrink-0'>
        <h2 className='text-base flex items-center gap-2 font-semibold text-text/70'>
          <Group size={16} className='text-text'/>
          <span>{t('activity-logs')}</span>
        </h2>
      </div>
      <ScrollArea className="relative w-full h-[40rem] border-y border-border">
        <div className="relative w-full flex-1 border-y border-border">
          <div className="relative w-full h-full flex flex-col overflow-hidden">
          {data?.map((log, index) => (
            <div key={log._id} className="relative gap-2 items-center w-full grid grid-cols-[auto_auto_auto_auto_auto_1.5fr_1fr] border-b border-border font-mono text-sm">
              <span className="w-10 h-10 flex items-center justify-center bg-bg-100/50">{index + 1}</span>
              <div className="inline-block truncate">
                <span className="text-black bg-white">{log.timestamp}</span>
              </div>
              <div className="inline-block truncate">{getMethodVariant(log.method)}</div>
              <div className="inline-block truncate">{log.url}</div>
              <div className="inline-block truncate"><span className="text-amber-500">{log.ip}</span></div>
              <div className="inline-block truncate"><span className="text-teal-500">{log.userId}</span></div>
              <div className="inline-block truncate pe-2">{log.userAgent}</div>
            </div>
          ))}
          </div>
        </div>
      </ScrollArea>
  
      {/* <div className='relative w-full flex flex-1 min-h-0 flex-col overflow-hidden'>
        {(!data || data.length === 0) ? (
          <div className="flex items-center justify-center py-12 text-text/50">
            <span className="text-base">No activity logs available</span>
          </div>
        ) : (
          <div className="relative w-full h-full overflow-auto">
            <Table className='w-full h-full table-fixed'>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ width: '80px', minWidth: '80px', height: '48px' }}>Method</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>User Agent</TableHead>
                  <TableHead>Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((log) => (
                  <TableRow key={log._id}>
                    <TableCell>
                      {getMethodVariant(log.method)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-0">
                        <GitFork size={12} className="text-teal-500 shrink-0" />
                        <span className="text-sm font-medium text-text/90 truncate" title={log.url}>
                          {log.url || 'N/A'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DotBadge variant="sky" className="text-xs">
                        {log.ip || 'N/A'}
                      </DotBadge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <User size={12} className="text-text/60 shrink-0" />
                        <span className="text-sm text-text/70 truncate" title={log.userId}>
                          {log.userId || 'N/A'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {log.location?.country ? (
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm text-text/70 truncate">
                              {log.location.country}
                            </span>
                            {log.location.region && log.location.region !== log.location.country && (
                              <span className="text-xs text-text/50 truncate">
                                {log.location.region}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-text/50">N/A</span>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs text-text/60 truncate" title={log.userAgent}>
                          {log.userAgent ? (log.userAgent.length > 50 ? `${log.userAgent.substring(0, 50)}...` : log.userAgent) : 'N/A'}
                        </span>
                      </div>
                    </TableCell>
                      <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-text/50 shrink-0" />
                          <span className="text-xs text-text/70 whitespace-nowrap">
                            {formatTime(log.timestamp || log.createdAt)}
                          </span>
                        </div>
                        <span className="text-xs text-text/50 whitespace-nowrap">
                          {formatDate(log.createdAt)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div> */}
    </div>
  )
}

function ActivityLogger() {
  return (
    <div className='relative w-full flex flex-col flex-1 h-300 border-b border-border overflow-hidden'>
      <ScrollFollow
        startFollowing={true}
        render={({ follow, onScroll }) => (
            <LazyLog url={import.meta.env.VITE_API_BASE_URL + '/app/logs'} stream follow={follow} onScroll={onScroll} />
        )}
      />
    </div>
  )
}

function ActiveUsers() {

  const {t} = useTranslation()

  return (
    <div className='relative border-s border-s-border flex flex-col w-120 border-b border-border border-t'>
      <div className='relative w-full flex items-center justify-between px-5 py-3 border-b border-border bg-bg-300/50 shrink-0'>
        <h2 className='text-base flex items-center gap-2 font-semibold text-text/70'>
          <Users2 size={16} className='text-text'/>
          <span>{t('active-users')}</span></h2>
        </div>
        <div className='relative w-full flex flex-1 min-h-0'>
          <ScrollArea className="relative w-full h-full">
            
          </ScrollArea>
        </div>
    </div>
  )
}

function ActiveCountries() {
  const {t} = useTranslation()
  return (
    <div className='relative flex flex-col w-96 border-s border-s-border border-b border-border shrink-0'>
      <div className='relative w-full flex items-center justify-between px-5 py-3 border-b border-border bg-bg-300/50 shrink-0'>
        <h2 className='text-base flex items-center gap-2 font-semibold text-text/70'>
        <Globe2Icon size={16} className='text-text'/>
        <span>{t('active-countries')}</span></h2>
      </div>
      <div className='relative w-full flex flex-1 min-h-0'>

      </div>
    </div>
  )
}

function ViewFullLogs() {

  const [open, setOpen] = useAtom(viewFullLogsAtom)
  const {t} = useTranslation()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="min-w-[50rem] max-w-[50rem]">
        <SheetHeader>
          <SheetTitle>{t('application-logs')}</SheetTitle>
          <SheetDescription>{t('watch_the_application_logs_in_real_time')}</SheetDescription>
        </SheetHeader>
        
        <ScrollFollow
          startFollowing={true}
          render={({ follow, onScroll }) => (
              <LazyLog 
              enableHotKeys={true}
              enableSearch={true}
              enableBasicAutocompletion={true}
              enableLiveAutocompletion={true}
              enableSnippets={true}
              enableBasicSuggestions={true}
              url={import.meta.env.VITE_API_BASE_URL + '/app/logs'} stream follow={follow} onScroll={onScroll} />
          )}
        />
      </SheetContent>
    </Sheet>
  )
}