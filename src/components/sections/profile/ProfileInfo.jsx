import { useTheme } from "next-themes"
import { toast } from "sonner"
import { authClient } from '@/auth'
import ImageComponent from "../../ui/ImageComponent"
import { useState } from "react"
import { Edit, ImageUp } from "lucide-react"
import { Button } from "../../ui/button"
import { AnimatePresence } from "motion/react"
import FormLoader from "../../loaders/FormLoader"
import { ImageCropper } from "../../helpers/ImageCropper"
import { useEffect } from "react"
export default function ProfileInfo({user, refetch}) {
  return (
    <div className="relative flex flex-col border-b border-e border-border overflow-hidden">
        <ProfileBanner user={user} refetch={refetch}/>
        <ProfileAvatar user={user} refetch={refetch}/>
        <ProfileTitle user={user}/>
        {/* <ProfileBio user={user}/>
        <ProfileSkills user={user}/>
        <ProfileContact user={user}/>
        <ProfileSocialLinks user={user}/> */}
    </div>
  )
}

function ProfileBanner({user, refetch}) {

  const [isCropModalOpen, setIsCropModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const {resolvedTheme} = useTheme()


  const handleImageChange = async () => {
    setLoading(true)
      try{
          const [fileHandle] = await window.showOpenFilePicker({
              types: [
                  {
                      description: 'Images',
                      accept: {
                          'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
                      },
                  },
              ],
              multiple: false,
          });
  
          const file = await fileHandle.getFile();

          if(file){
              setIsCropModalOpen(true)
              setSelectedFile(file)
          }
          console.log('Selected file:', file.name);
      }catch(error){
          console.log('Error:', error)
          toast.error(error.message || error.error)
      }finally{
        setLoading(false)
      }
  }

  const handleUpdateCompeted = async (data) => {
    try{
      await authClient.updateUser({
        bannerImage: {
          key: data.key,
          bucket: data.bucket,
          name: data.name,
          type: data.type,
          size: data.size,
        },
      }, {
        onSuccess: async ()=> {
          await refetch()
        }
      })
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  const handleDelete = () => {
      console.log('Delete')
  }

  useEffect(() => {
      if(isCropModalOpen === false){
          setSelectedFile(null)
      }
  }, [isCropModalOpen])


    return (
        <div className="relative w-full h-[9rem] bg-bg-300 z-5 overflow-hidden">
            {
                user?.bannerImage?.key ?
                <ImageComponent imageKey={user?.bannerImage?.key} bucket={user?.bannerImage?.bucket} alt="Profile Avatar" />
                :
                <div className="w-full h-full flex relative items-center justify-center">
                    <img src={resolvedTheme === 'dark' ? '/banner-placeholder-dark.png' : '/banner-placeholder-light.png'} alt="Profile Banner" className="w-full h-full object-cover" />
                </div>
            }

            <div className="absolute top-0 right-0 p-2 z-10">
                <Button onClick={handleImageChange} variant="blurShade" size="iconSm" title="Edit Banner Image" aria-label="Edit Banner Image">
                    <Edit className="!w-3.5 !h-3.5" />
                </Button>
            </div>

            <ImageCropper 
              file={selectedFile} 
              open={isCropModalOpen}  
              onOpenChange={setIsCropModalOpen} 
              bucket={user?.digitalID?.toLowerCase()} 
              path={'profile/'} 
              onUpdateCompeted={handleUpdateCompeted}
              aspect={16/6}
            />

            <AnimatePresence>
                {
                    loading ? 
                    <FormLoader key="form-loader" />
                    :
                    null
                }
            </AnimatePresence>

        </div>
    )
}

function ProfileAvatar({user, refetch}) {

  const [isCropModalOpen, setIsCropModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const {resolvedTheme} = useTheme()

  const handleImageChange = async () => {
    setLoading(true)
      try{
          const [fileHandle] = await window.showOpenFilePicker({
              types: [
                  {
                      description: 'Images',
                      accept: {
                          'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
                      },
                  },
              ],
              multiple: false,
          });
  
          const file = await fileHandle.getFile();

          if(file){
              setIsCropModalOpen(true)
              setSelectedFile(file)
          }
          console.log('Selected file:', file.name);
      }catch(error){
          console.log('Error:', error)
          toast.error(error.message || error.error)
      }finally{
        setLoading(false)
      }
  }

  const handleUpdateCompeted = async (data) => {
    try{
      await authClient.updateUser({
        image: {
          key: data.key,
          bucket: data.bucket,
          name: data.name,
          type: data.type,
          size: data.size,
        },
      }, {
        onSuccess: async ()=> {
          await refetch()
        }
      })
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  const handleDelete = () => {
      console.log('Delete')
  }

  useEffect(() => {
      if(isCropModalOpen === false){
          setSelectedFile(null)
      }
  }, [isCropModalOpen])


    return (
        <div className="relative w-full flex gap-5 p-6 mt-[-5rem] z-10">
            <button type="button" onClick={handleImageChange} className="relative w-[7rem] h-[7rem] rounded-xl border border-border-600 overflow-hidden bg-bg-100 cursor-pointer group aspect-square block">
                {
                    user?.image?.key ?
                    <ImageComponent imageKey={user?.image?.key} bucket={user?.image?.bucket} alt="Profile Avatar" />
                    :
                    <img src={resolvedTheme === 'dark' ? '/user-avatar-dark.png' : '/user-avatar-light.png'} alt="Profile Avatar" className="w-full h-full object-cover" />
                }

                <div className="absolute inset-0 z-5 flex items-center justify-center bg-bg/90 opacity-0 overflow-hidden transition-all duration-300 group-hover:scale-130 group-hover:opacity-100">
                  <ImageUp size={28} className="opacity-50" />
                </div>
                <AnimatePresence>
                    {
                        loading ? 
                        <FormLoader key="form-loader" />
                        :
                        null
                    }
                </AnimatePresence>
            </button>
            <ImageCropper 
            file={selectedFile} 
            open={isCropModalOpen}  
            onOpenChange={setIsCropModalOpen} 
            bucket={user?.digitalID?.toLowerCase()} 
            path={'profile/'} 
            onUpdateCompeted={handleUpdateCompeted}/>
        </div>
    )
}

function ProfileTitle({user}) {
    return (
        <div className="relative w-full flex flex-col px-6 pb-6">
            <h2 className="text-2xl font-medium">{user?.name}</h2>
            <div className="relative w-full flex items-center justify-start gap-3 mt-2">
            <p className="text-sm text-text/60 px-3 py-1 rounded-xl bg-bg-100/50">{user?.email}</p>
            </div>
        </div>
    )
}

function ProfileBio({user}) {
    return (
        <div className="relative w-full flex flex-col px-6 pb-6">
            <p className="text-sm text-text/60">{'Bio'}</p>
        </div>
    )
}

function ProfileSkills({user}) {
  return (
      <div className="relative w-full flex flex-col px-6 pb-6">
          <p className="text-sm text-text/60">{'Skills'}</p>
      </div>
  )
}

function ProfileContact({user}) {
  return (
      <div className="relative w-full flex flex-col px-6 pb-6">
          <p className="text-sm text-text/60">{'Contact'}</p>
      </div>
  )
}

function ProfileSocialLinks({user}) {
  return (
      <div className="relative w-full flex flex-col px-6 pb-6">
          <p className="text-sm text-text/60">{'Social Links'}</p>
      </div>
  )
}