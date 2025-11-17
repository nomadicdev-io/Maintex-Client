import { useMemo, useState, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import "react-easy-crop/react-easy-crop.css"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogHeader,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import getCroppedImg from '@/lib/getCroppedImage'
import { RefreshCcw, RefreshCcwIcon, Rotate3D, RotateCcw, RotateCw, RotateCwIcon } from 'lucide-react'
import orbit from '../../api'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid';

export const ImageCropper = ({
    file, 
    open, 
    onOpenChange, 
    aspect = 1, 
    title = 'Edit Image',
    description = 'Edit the image to your desired size and position.',
    disableRotate = false,
    bucket = '',
    path = '',
    onUpdateCompeted
}) => {

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [rotation, setRotation] = useState(0)

    const url = useMemo(() => {
        return file ? URL.createObjectURL(file) : null
    }, [file])

    // Cleanup object URL on unmount or file change
    useEffect(() => {
        return () => {
            if (url) {
                URL.revokeObjectURL(url)
            }
        }
    }, [url])

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const resetCrop = () => {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
        setCroppedAreaPixels(null);
    };

    const onUpload = async () => {
        if (!croppedAreaPixels) {
            toast.error('Please crop the image first');
            return;
        }

        setIsLoading(true);
        try{
            const croppedImg = await getCroppedImg(url, croppedAreaPixels, rotation)
            
            if (!croppedImg) {
                toast.error('Failed to process image');
                setIsLoading(false);
                return;
            }

            // Validate that croppedImg is a valid blob
            if (!croppedImg || !(croppedImg instanceof Blob)) {
                toast.error('Failed to create image blob');
                setIsLoading(false);
                return;
            }

            const fileName = uuidv4().toString() + '.png'

            const formData = new FormData()

            const uploadFile = new File([croppedImg], fileName, { type: 'image/png', lastModified: new Date().getTime() })
            
            formData.append('file', uploadFile)
            formData.append('bucket', bucket)
            formData.append('path', path)

            const res = await orbit.upload.s3Upload({data: formData})

            if(res?.status){
                onUpdateCompeted(res.data)
                toast.success('Image uploaded successfully');
                onOpenChange(false);
                return true
            }else{
                toast.error('Failed to upload file')
                return false
            }

        }catch(error){
            console.error('Upload error:', error);
            toast.error(error?.message || 'Failed to upload image');
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange} aria-describedby={'crop-modal'}>
            <DialogContent className="min-w-[50rem] max-w-[50rem] ">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
            <div className="relative w-full flex flex-col max-h-[30rem] min-h-[27.5rem] bg-bg-300">
                <Cropper
                    image={url}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    rotation={rotation} 
                    showGrid={true}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    objectFit={'contain'}
                    restrictPosition={true}
                    classes={{
                        containerClassName: 'w-full h-full relative',
                        mediaClassName: 'w-full h-full block relative',
                    }}
                />
            </div>

            <DialogFooter >
                <div className='flex flex-row gap-5 items-center justify-between w-full'>
                    <div className="flex gap-2 relative">
                    <Button size="icon" title="Reset Crop" aria-label="Reset Crop" variant="defaultIcon" disabled={isLoading} onClick={resetCrop}>
                        <RefreshCcw size={16} />
                    </Button>
                    {
                        !disableRotate ? (
                            <>
                            <Button onClick={() => setRotation(rotation - 90)} size="icon" title="Rotate Left" aria-label="Rotate Left" variant="defaultIcon" disabled={isLoading} >
                                <RotateCcw size={16} />
                            </Button>
                            <Button onClick={() => setRotation(rotation + 90)} size="icon" title="Rotate Right" aria-label="Rotate Right" variant="defaultIcon" disabled={isLoading} >
                                <RotateCw size={16} />
                            </Button>
                            </>
                        ) : null
                    }
                    
               
                    </div>
                    <div className="flex gap-3 relative">
                        <DialogClose asChild>
                            <Button title="Cancel" aria-label="Cancel" variant="shade" disabled={isLoading}>Cancel</Button>
                        </DialogClose>
                        <Button title="Apply" aria-label="Apply" variant="default" onClick={onUpload} isLoading={isLoading}>Apply</Button>
                    </div>
                </div>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}