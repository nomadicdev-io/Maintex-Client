import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@/components/sections/DashboardBanner'
import DataField from '@/components/ui/DataField'
import { Button } from '../../../../../components/ui/button'
import { Bot, RadioIcon, Upload } from 'lucide-react'
import { orbitAI } from '../../../../../api'
import { useRef } from 'react'
import { toast } from 'sonner'

export const Route = createLazyFileRoute(
  '/app/_app/development/_development/toolkit',
)({
  component: RouteComponent,
})  

function RouteComponent() {


  const handleAITest = async () => {
    try{
      const response = await orbitAI.post({
        url: 'test',
        data: {
          message: 'Hello, who are you?'
        }
      })
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className='relative w-full flex flex-col h-full'>
      <DashboardBanner title={'Development Toolkit'} description={'Development toolkit for the application. You can change the development toolkit here.'} />

      <div className="relative w-full grid grid-cols-2 h-full">
        <div className="relative flex flex-col w-full h-full border-e border-border">
          <DataField
            label="2FA"
          />
          <DataField
            label="Passkey"
          />

          <DataField
            label="AI Test"
          >
            <Button variant="whiteShade">
              <Bot />
              <span>Test AI</span>
            </Button>
          </DataField>

          <DataField
            label="Socket Subscribe"
          >
            <Button variant="whiteShade">
              <RadioIcon />
              <span>Subscribe</span>
            </Button>
          </DataField>

          <StaticFileUpload />
          <S3FileUpload />
        </div>
      </div>
    </div>
  )
}

function StaticFileUpload() {

  const fileInputRef = useRef(null)

  const handleStaticFileUpload = async (e) => {
    try{
      // const response = await orbit.upload.static({data: formData})

      const file = e.target.files[0]

      const formData = new FormData()
      formData.append('file', file)
      formData.append('path', 'storage/assets/')

      const response = await storageAPI.staticUpload(formData, {
        onSuccess: (data) => {
          console.log(data)
        },
        onError: (error) => {
          console.log(error?.data || error?.message || error)
        }
      })

      if(fileInputRef?.current) fileInputRef.current.value = null

    }catch(error){
      toast.error(error.message)
      if(fileInputRef?.current) fileInputRef.current.value = null
      console.log(error)
    }
  }
  return (
    <DataField
      label="Static File Upload"
    >
      <input type="file" ref={fileInputRef} onChange={handleStaticFileUpload} hidden/>
      <Button variant="whiteShade" onClick={()=> fileInputRef?.current?.click()}>
        <Upload />
        <span>Upload</span>
      </Button>
    </DataField>
  )
}

function S3FileUpload() {

  const fileInputRef = useRef(null)
  const handleS3FileUpload = async (e) => {
    try{

      const file = e.target.files[0]
      const formData = new FormData()

      formData.append('file', file)
      formData.append('bucket', 'maintex')
      formData.append('path', 'storage/assets/')

      const response = await storageAPI.s3Upload(formData, {
        onSuccess: (data) => {
          console.log(data)
        },
        onError: (error) => {
          console.log(error?.data || error?.message || error)
        }
      })

      if(fileInputRef?.current) fileInputRef.current.value = null

    }catch(error){
      console.log(error)
    }
  } 
  return (
    <DataField
      label="S3 File Upload"
    >
      <input type="file" ref={fileInputRef} onChange={handleS3FileUpload} hidden/>
      <Button variant="whiteShade" onClick={()=> fileInputRef?.current?.click()}>
        <Upload />
        <span>Upload</span>
      </Button>
    </DataField>
  )
}