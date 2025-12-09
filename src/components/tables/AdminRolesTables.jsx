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
import dayjs from 'dayjs'
import { Ellipsis } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

export default function AdminRolesTables({data, onRefetch, onItemClick}) {

    const {t} = useTranslation()

    return (
        <div className='relative w-full '>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead style={{width: '50px'}}>#</TableHead>
                    <TableHead style={{maxWidth: '20rem'}}>{t('name')}</TableHead>
                    <TableHead>{t('value')}</TableHead>
                    <TableHead>{t('permissions')}</TableHead>
                    <TableHead>{t('created-at')}</TableHead>
                    <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {
                    data.map((item, index) => (
                        <TableRow key={item._id}>
                            <TableCell className="text-text/50">{indexGenerator(index + 1)}</TableCell>
                            <TableCell className="text-semibold truncate">{item.name}</TableCell>
                            <TableCell><Badge variant="teal">{item.value}</Badge></TableCell>
                            <TableCell><Badge>{item.permissions.join(', ')}</Badge></TableCell>
                            <TableCell className="text-text/75">
                                <span className="text-text/75">{dayjs(item?.createdAt).format('DD MMM YYYY')}</span>
                            </TableCell>
                            <TableCell className="text-center">
                                <Button onClick={()=> onItemClick(item._id)} size="iconSm" variant="defaultIcon" >
                                    <Ellipsis opacity={0.75} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
                </TableBody>
            </Table>
        </div>
    )
}
