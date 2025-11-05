import { createFileRoute } from '@tanstack/react-router'
import orbit from '@/api'
import { toast } from 'sonner'

export const Route = createFileRoute('/app/_app/test')({
  component: RouteComponent,
})

function RouteComponent() {

  const handleFileChange = async (e) => {
    try{
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('path', 'uploads/')
      formData.append('file', file)

      await orbit.upload.static({data: formData}, {
        onSuccess: (data) => {
          console.log(data)
        },
        onError: (error) => {
          console.log(error)
          toast.error(error.message)
        }
      })
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="relative flex-1 flex flex-col w-full h-full p-8">
      <input type='file' onChange={handleFileChange}  />
    </div>
  )
}
