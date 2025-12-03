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
import { Clock, Ellipsis, ListFilter, RotateCcw, SortAsc } from 'lucide-react'
import TotalItem from '../ui/TotalItem'
import { ButtonGroup } from "@/components/ui/button-group"
import SearchBar from '../ui/SearchBar'
import { TablePagination } from '../ui/TablePagination'


export default function AdminTicketsTable({data, onRefresh}) {

    const {t} = useTranslation()

    const getPriority = (priority) => {
        switch(priority) {
            case 'low':
                return <Badge variant="teal">{t('low')}</Badge>
            case 'medium':
                return <Badge variant="sky">{t('medium')}</Badge>
            case 'high':
                return <Badge variant="amber">{t('high')}</Badge>
            case 'critical':
                return <Badge variant="red">{t('critical')}</Badge>
        }
    }

    const getStatus = (status) => {
        switch(status) {
            case 'pending':
                return <DotBadge variant="amber">{t('pending')}</DotBadge>
            case 'open':
                return <DotBadge variant="sky">{t('open')}</DotBadge>
            case 'new':
                return <DotBadge variant="sky">{t('new')}</DotBadge>
            case 'closed':
                return <DotBadge variant="teal">{t('closed')}</DotBadge>
            case 'resolved':
                return <DotBadge variant="teal">{t('resolved')}</DotBadge>
            case 'rejected':
                return <DotBadge variant="red">{t('rejected')}</DotBadge>
            case 'in-progress':
                return <DotBadge variant="blue">{t('in-progress')}</DotBadge>
            case 'on-hold':
                return <DotBadge variant="cyan">{t('on-hold')}</DotBadge>
        }
    }

    const handleViewTicket = (id) => {
        console.log(id)
    }

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
                                <TableCell>{getPriority(item.priority)}</TableCell>
                                <TableCell>{getStatus(item.status)}</TableCell>
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

        <TablePagination />
      </div>
    )
}

