import { useTheme } from "next-themes"
import { toast } from "sonner"
import orbit from "@api"
import { imageFormats } from "../../../store/imageFormats"
import { authClient } from '../../../auth'
import ImageComponent from "../../ui/ImageComponent"
import { useState } from "react"
import { Edit, ImageUp } from "lucide-react"
import { Button } from "../../ui/button"
import { AnimatePresence } from "motion/react"
import FormLoader from "../../loaders/FormLoader"

export default function ProfileInfo({user, refetch}) {
  return (
    <div className="relative flex flex-col border border-border overflow-hidden">
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

    const [loading, setLoading] = useState(false)
    const {resolvedTheme} = useTheme()

    const handleImageChange = async (e) => {
        setLoading(true)
        try{
          const file = e.target.files[0]
          if(!file) return
    
          if(!imageFormats.includes(file.type)) return toast.error('Invalid image format')
    
          const size = file.size / 1024 / 1024
          if(size > 5) return toast.error('Image size must be less than 2MB')
    
          const formData = new FormData()
          formData.append('file', file)
          formData.append('path', 'profile/')
          formData.append('type', file.type)
          formData.append('bucket', user?.id)
        
          await orbit.upload.single({data: formData}, {
            onSuccess: async ({data}) => {
              await authClient.updateUser({
                bannerImage: data.key,
              }, {
                onSuccess: async ()=> {
                    await refetch()
                }
              })
            },
            onError: (error) => {
              console.log(error)
            }
          })
          toast.success('Profile Image updated!')
        }catch(error){
          console.log(error)
          toast.error(error.message)
        }finally{
          setLoading(false)
        }
    }

    return (
        <div className="relative w-full h-[12rem] bg-bg-300 z-5 overflow-hidden">
            {
                user?.bannerImage ?
                <ImageComponent src={user?.bannerImage} alt="Profile Avatar" />
                :
                <div className="w-full h-full flex relative items-center justify-center">
                    <img src={resolvedTheme === 'dark' ? '/banner-placeholder-dark.png' : '/banner-placeholder-light.png'} alt="Profile Banner" className="w-full h-full object-cover" />
                </div>
            }

            <div className="absolute top-0 right-0 p-2">
                <Button variant="blurShade" size="iconSmall" title="Edit Banner Image" aria-label="Edit Banner Image">
                    <Edit className="!w-4 !h-4" />
                    <input accept="image/*" type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 z-6 cursor-pointer" />
                </Button>
            </div>

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

    const {resolvedTheme} = useTheme()
    const [loading, setLoading] = useState(false)

    const handleImageChange = async (e) => {
        setLoading(true)
        try{
          const file = e.target.files[0]
          if(!file) return
    
          if(!imageFormats.includes(file.type)) return toast.error('Invalid image format')
    
          const size = file.size / 1024 / 1024
          if(size > 5) return toast.error('Image size must be less than 2MB')
  
          const req = {
            file: file,
            path: 'profile/',
            type: file.type,
            bucket: user?.id,
          }
        
          await orbit.upload.single({data: req}, {
            onSuccess: async ({data}) => {
              await authClient.updateUser({
                image: data.key,
              }, {
                onSuccess: async ()=> {
                    await refetch()
                }
              })
            },
            onError: (error) => {
              console.log(error)
            }
          })
          toast.success('Profile Image updated!')
        }catch(error){
          console.log(error)
          toast.error(error.message)
        }finally{
          setLoading(false)
        }
    }


    return (
        <div className="relative w-full flex gap-5 p-6 mt-[-6rem] z-10">
            <div className="relative w-[10rem] h-[10rem] rounded-xl border border-border-600 overflow-hidden bg-bg-100 cursor-pointer group aspect-square block">
                {
                    user?.image ?
                    <ImageComponent src={user?.image} alt="Profile Avatar" />
                    :
                    <img src={resolvedTheme === 'dark' ? '/user-avatar-dark.png' : '/user-avatar-light.png'} alt="Profile Avatar" className="w-full h-full object-cover" />
                }
                <input accept="image/*" type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 z-6 cursor-pointer" />

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
            </div>
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