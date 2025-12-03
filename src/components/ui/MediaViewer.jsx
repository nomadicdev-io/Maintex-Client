import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { XIcon } from "lucide-react"
import { getStaticImage, getS3Image } from "@/lib/getImage"
import {  useMemo, useState } from "react"
import ImageComponent from "./ImageComponent"
import DocViewer, { DocViewerRenderers, PDFRenderer, PNGRenderer } from "react-doc-viewer";
import "./MediaViewer.scss"
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { ScrollArea } from "@/components/ui/scroll-area"

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function MediaViewer({title, src, open, onOpenChange, showCloseButton}) {
  const url = useMemo(()=> {

    if(!src || !src?.key || !src?.bucket) return null
    
    let url = null
    if(src?.isStatic) {
        url =  getStaticImage(src?.key)
    }else{
        url = getS3Image(src?.key, src?.bucket)
    }
    return url
  }, [src?.key])


  return (
    <Dialog open={open} onOpenChange={onOpenChange} >

       
        <DialogContent aria-describedby="media-viewer" className="w-screem h-screen max-w-screen min-w-screen dark:bg-transparent bg-transparent" showCloseButton={showCloseButton}>
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
                      <PDFViewer file={url} />
                    ):(
                      (
                        <DocViewer
                          pluginRenderers={[DocViewerRenderers, PDFRenderer, PNGRenderer]}
                          documents={[{uri: url}]}
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

function PDFViewer({file}) {
  const [numPages, setNumPages] = useState(null);
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <ScrollArea className="w-auto h-full">
      <Document
        file={file}
        className="w-auto h-full"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </ScrollArea>
  );
}