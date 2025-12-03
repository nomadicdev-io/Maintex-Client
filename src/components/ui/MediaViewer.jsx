import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { XIcon } from "lucide-react"
import { getStaticImage, getS3Image } from "@/lib/getImage"
import {  useMemo } from "react"
import ImageComponent from "./ImageComponent"
import DocViewer, { DocViewerRenderers, PDFRenderer, PNGRenderer } from "react-doc-viewer";
import "./MediaViewer.scss"

export function MediaViewer({title, src, open, onOpenChange, showCloseButton}) {


  const stream = useMemo(()=> {
    let url = null
    if(src?.isStatic) {
        url =  getStaticImage(src?.key)
    }else{
        url = getS3Image(src?.key, src?.bucket)
    }
    console.log('URL', url)
    return url
  }, [src?.key, src?.bucket])


  return (
    <Dialog open={open} onOpenChange={onOpenChange} >

       
        <DialogContent className="w-screem h-screen max-w-screen min-w-screen dark:bg-transparent bg-transparent" showCloseButton={showCloseButton}>
            <div className="fixed top-0 p-4 right-0 flex items-center gap-2 z-10">
            <Button type="button" size="iconSm" variant="shade" onClick={onOpenChange}>
                <XIcon size={14} />
            </Button>
            </div>

            <DialogHeader className="hidden">
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
                <div className="relative w-[90%] h-[90%] rounded-lg overflow-hidden flex items-center justify-center justify-center">
                  {
                    src?.type?.includes('image') ? (
                      <ImageComponent classNames={{image: "object-contain"}} imageKey={src?.key} bucket={src?.bucket} alt="Attachment" isStatic={src?.isStatic} className="w-full h-full object-contain" />

                    ) : 
                    
                    src?.type?.includes('pdf') ? (
                      <iframe src={stream} className="w-full h-full"  />
                    ):(
                      (
                        <DocViewer
                          pluginRenderers={[DocViewerRenderers, PDFRenderer, PNGRenderer]}
                          documents={[{uri: stream}]}
                          className="media-viewer-doc"
                        />
                      )
                    )

                  }
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}
