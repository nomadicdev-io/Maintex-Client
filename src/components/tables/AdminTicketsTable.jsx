import { useTranslation } from 'react-i18next'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { indexGenerator } from '../../lib/indexGenerator'
import { Badge } from "@/components/ui/badge"
import dayjs from 'dayjs'
import { DotBadge } from '../ui/dot-badge'
import { Button } from '../ui/button'
import { CircleX, Clock, Ellipsis, FileSpreadsheet, ListFilter, RotateCcw, SortAsc } from 'lucide-react'
import TotalItem from '../ui/TotalItem'
import { ButtonGroup } from "@/components/ui/button-group"
import SearchBar from '../ui/SearchBar'
import { TablePagination } from '../ui/TablePagination'
import { atom, useAtom, useSetAtom } from 'jotai'
import { useCallback, useMemo } from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import { SheetFooter } from '../ui/sheet'
import { MediaViewer } from '../ui/MediaViewer'
import ImageComponent from '../ui/ImageComponent'
import { getS3Image, getStaticImage } from '@/lib/getImage';


const adminTicketsAtom = atom('')
const mediaViewerAtom = atom(false)

const getPriority = (priority, t, size = 'md') => {
    switch(priority) {
        case 'low':
            return <Badge variant="teal" size={size}>{t('low')}</Badge>
        case 'medium':
            return <Badge variant="sky" size={size}>{t('medium')}</Badge>
        case 'high':
            return <Badge variant="amber" size={size}>{t('high')}</Badge>
        case 'critical':
            return <Badge variant="red" size={size}>{t('critical')}</Badge>
    }
}

const getStatus = (status, t, size = 'md') => {
    switch(status) {
        case 'pending':
            return <DotBadge variant="amber" size={size}>{t('pending')}</DotBadge>
        case 'open':
            return <DotBadge variant="sky" size={size}>{t('open')}</DotBadge>
        case 'new':
            return <DotBadge variant="sky" size={size}>{t('new')}</DotBadge>
        case 'closed':
            return <DotBadge variant="teal" size={size}>{t('closed')}</DotBadge>
        case 'resolved':
            return <DotBadge variant="teal" size={size}>{t('resolved')}</DotBadge>
        case 'rejected':
            return <DotBadge variant="red" size={size}>{t('rejected')}</DotBadge>
        case 'in-progress':
            return <DotBadge variant="blue" size={size}>{t('in-progress')}</DotBadge>
        case 'on-hold':
            return <DotBadge variant="cyan" size={size}>{t('on-hold')}</DotBadge>
    }
}

export default function AdminTicketsTable({data, onRefresh}) {

    const {t} = useTranslation()
    const [adminTicket, setAdminTicket] = useAtom(adminTicketsAtom)
    const [mediaViewer, setMediaViewer] = useAtom(mediaViewerAtom)

    const handleViewTicket = useCallback((id) => setAdminTicket(id), [adminTicket])
    const handleViewMedia = useCallback((src) => setMediaViewer(src), [mediaViewer])

    const handleMediaViewerChange = useCallback(() => setMediaViewer(mediaViewer ? false : true), [mediaViewer])

    return (
      <div className='relative w-full flex flex-col'>
        <div className='relative w-full flex items-center justify-between mb-5'>
            <div className='relative flex flex-1 items-center gap-2'>
                <ButtonGroup>
                    <Button variant="shade">
                        <ListFilter className="text-text" size={14} />
                        <span>{t('filter')}</span>
                    </Button>
                    <Button variant="shade">
                        <SortAsc className="text-text" size={14} />
                        <span>{t('sort')}</span>
                    </Button>
                </ButtonGroup>
                <TotalItem total={data.length} />
                <Button variant="shade" type="button" onClick={onRefresh}>
                    <RotateCcw className="text-text" size={14} />
                    <span>{t('refresh')}</span>
                </Button>
            </div>
            <SearchBar />
        </div>
        
        <div className='relative w-full '>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead style={{width: '50px'}}>#</TableHead>
                    <TableHead style={{maxWidth: '20rem'}}>{t('subject')}</TableHead>
                    <TableHead>{t('category')}</TableHead>
                    <TableHead>{t('priority')}</TableHead>
                    <TableHead>{t('status')}</TableHead>
                    <TableHead>{t('created-at')}</TableHead>
                    <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.map((item, index) => (
                            <TableRow key={item._id}>
                                <TableCell className="text-text/50">{indexGenerator(index + 1)}</TableCell>
                                <TableCell className="text-semibold truncate">{item.subject}</TableCell>
                                <TableCell className="capitalize"><Badge variant="outline">{item.category}</Badge></TableCell>
                                <TableCell>{getPriority(item.priority, t)}</TableCell>
                                <TableCell>{getStatus(item.status, t)}</TableCell>
                                <TableCell className="text-text/75">
                                    <div className="inline-flex items-center gap-2">
                                        <Clock className="text-text/75" size={14} />
                                        <span className="text-text/75">{dayjs(item?.createdAt).format('DD MMM YYYY')}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button onClick={()=> handleViewTicket(item._id)} size="iconSm" variant="defaultIcon" >
                                        <Ellipsis opacity={0.75} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>

        <DetailSheet data={data} />

        <MediaViewer 
            title={t('media-viewer')}
            src={mediaViewer}
            open={mediaViewer}
            onOpenChange={handleMediaViewerChange}
            showCloseButton={false}
        />

        {/* <TablePagination /> */}
      </div>
    )
}

function DetailSheet({data}) {

    const {t} = useTranslation()
    const [adminTicket, setAdminTicket] = useAtom(adminTicketsAtom)

    const isOpen = useMemo(()=> {
        return adminTicket !== ''
    }, [adminTicket])

    const getFile = useCallback((key, bucket)=> {
        if(bucket === 'static') {
            return getStaticImage(key)
        }else{
            return getS3Image(key, bucket)
        }
    }, [])

    const handleChange = useCallback(() => setAdminTicket(isOpen ? '' : adminTicket), [adminTicket])

    const currentData = useMemo(()=> {
        return data.find((item)=> item._id === adminTicket)
    }, [adminTicket])

    return (
        <Sheet open={isOpen} onOpenChange={handleChange}>
        <SheetContent>
          <SheetHeader className="pe-12 space-y-1">
            <SheetTitle>{currentData?.subject}</SheetTitle>
            <Badge variant="outline">{currentData?._id}</Badge>
          </SheetHeader>
          <div className="relative w-full grid grid-cols-2">
                {
                    currentData?.description ? (
                        <div className="relative w-full flex flex-col col-span-2 gap-1 border-b border-border-600 p-4">
                            <h3 className="text-sm font-medium text-text/65 mb-1">{t('description')}</h3>
                            <p className="text-base">{currentData?.description}</p>
                        </div>
                    ) : null
                }
            <div className="relative w-full flex flex-col gap-1 border-b border-border-600 p-4 border-e">
              <h3 className="text-sm font-medium text-text/65 mb-1">{t('category')}</h3>
              <p className="text-base capitalize">{currentData?.category}</p>
            </div>
            <div className="relative w-full flex flex-col gap-1 border-b border-border-600 p-4">
              <h3 className="text-sm font-medium text-text/65 mb-1">{t('priority')}</h3>
              <p className="text-base">{getPriority(currentData?.priority, t, 'lg')}</p>
            </div>
            <div className="relative w-full flex flex-col gap-1 border-b border-border-600 p-4 border-e">
              <h3 className="text-sm font-medium text-text/65 mb-1">{t('status')}</h3>
              <p className="text-base">{getStatus(currentData?.status, t, 'lg')}</p>
            </div>
            <div className="relative w-full flex flex-col gap-1 border-b border-border-600 p-4">
              <h3 className="text-sm font-medium text-text/65 mb-1">{t('created-by')}</h3>
              <p className="text-base w-full truncate">{currentData?.user}</p>
            </div>
            <div className="relative w-full flex flex-col gap-1 border-b border-border-600 p-4 border-e">
              <h3 className="text-sm font-medium text-text/65 mb-1">{t('created-at')}</h3>
              <p className="text-base">{dayjs(currentData?.createdAt).format('DD MMM YYYY')}</p>
            </div>
            <div className="relative w-full flex flex-col gap-1 border-b border-border-600 p-4">
              <h3 className="text-sm font-medium text-text/65 mb-1">{t('updated-at')}</h3>
              <p className="text-base">{dayjs(currentData?.updatedAt).format('DD MMM YYYY')}</p>
            </div>
            {
                currentData?.attachments?.length > 0 ? (
                    <div className="relative w-full flex flex-col col-span-2 gap-1 border-b border-border-600 p-4">
                        <h3 className="text-sm font-medium text-text/65 mb-1">{t('attachments')}</h3>
                        <div className="relative w-full grid grid-cols-3 gap-3">
                           {
                            currentData?.attachments.map((attachment, index)=> 
                                <AttachmentPreview key={index + 'attachment'} attachment={attachment} index={index} />
                            )
                           }
                        </div>
                    </div>
                ) : null
            }
            
          </div>
          <SheetFooter >
            <div className="relative w-full flex items-center gap-2">
                <Button variant="shade" onClick={handleChange}>
                    <CircleX className="text-text" size={12} opacity={0.75}/>
                    <span>{t('close')}</span>
                </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      )
}

function AttachmentPreview({attachment, index, isStatic = false}) {

    const setMediaViewer = useSetAtom(mediaViewerAtom)

    const handleView = useCallback(()=> {
        setMediaViewer(attachment)
    }, [attachment])



    if(attachment?.type.includes('image')) {
        return (
            <button onClick={handleView} type="button" key={index + 'attachment'} className="w-full h-auto aspect-square border border-border-600 rounded-lg overflow-hidden cursor-pointer group">
                <ImageComponent imageKey={attachment?.key} bucket={attachment?.bucket} alt="Attachment" isStatic={isStatic} className="group-hover:scale-110 transition-all duration-300"/>
            </button>
        )
    }
    
    return (
            <button onClick={handleView} type="button" key={index + 'attachment'} className="w-full h-auto aspect-square border border-border-600 rounded-lg overflow-hidden flex items-center justify-center bg-bg-100/50 cursor-pointer group">
            <FileSpreadsheet size={56} className="text-text-100 group-hover:scale-110 transition-all duration-300" />
        </button>
    )
}