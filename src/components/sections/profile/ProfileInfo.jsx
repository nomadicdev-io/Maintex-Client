import { useTheme } from "next-themes"
import { toast } from "sonner"
import { authClient } from '@/auth'
import ImageComponent from "../../ui/ImageComponent"
import { useMemo, useState } from "react"
import { DownloadCloud, Edit, ImageUp, MonitorDown, MonitorDownIcon, UserPen } from "lucide-react"
import { Button } from "../../ui/button"
import { AnimatePresence } from "motion/react"
import FormLoader from "../../loaders/FormLoader"
import { ImageCropper } from "../../helpers/ImageCropper"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "@tanstack/react-router"
import orbit from '@/api';
import { FaLinkedinIn, FaFacebook, FaX, FaInstagram, FaYoutube  } from "react-icons/fa6";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
export const description = "An interactive bar chart"

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]
const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
}

export default function ProfileInfo({user, refetch}) {

  const router = useRouter()
  const { t } = useTranslation()
  const [isDownloading, setIsDownloading] = useState(false)

  const onDownloadDigitalID = async () => {
    setIsDownloading(true)
    try{
      const response = await orbit.get({url: `profile/generate/digital-id`})

      if(response.error) throw response.error

      // window.open(response.data.url, '_blank')

    }catch(error){
      console.log(error)
      toast.error(error.message)
    }finally{
      setIsDownloading(false)
    }
  }

  return (
    <div className="relative flex flex-col border-b border-e border-border overflow-hidden">
        <ProfileBanner user={user} refetch={refetch}/>
        <ProfileAvatar user={user} refetch={refetch}/>
        <ProfileTitle user={user}/>

        <div className="relative w-full flex gap-2 items-center px-6 pt-6 border-t border-border pb-5">
         
          <Button onClick={onDownloadDigitalID} disabled={isDownloading}>
            <MonitorDownIcon />
            <span>{t('download-digital-id')}</span>
          </Button>
          <Button variant='whiteShade' onClick={() => router.navigate({ to: '/app/account/profile/edit-profile' })}>
            <UserPen />
            <span>{t('edit-profile')}</span>
          </Button>
        </div>
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
            <button type="button" onClick={handleImageChange} className="relative w-[7rem] h-[7rem] rounded-xl border border-text/10 overflow-hidden bg-bg-100 cursor-pointer group aspect-square block">
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
              <p className="text-sm text-text/75">{user?.email}</p>
            </div>

            <div className="relative w-full grid grid-cols-2 gap-5 mt-6">
              <div className="realtive w-full bg-bg-100/50 rounded-xl px-3 py-2">
                <p className="text-xs text-text/75">Location</p>
                <h4 className="text-sm font-medium truncate max-w-full">Dubai, UAE</h4>
              </div>
              <div className="realtive w-full bg-bg-100/50 rounded-xl px-3 py-2">
                <p className="text-xs text-text/75">Employee ID</p>
                <h4 className="text-sm font-medium truncate max-w-full" >{user?.digitalID || '-'}</h4>
              </div>
            </div>

            <div className="relative w-full block pt-5">
              <p className="text-sm text-text/75">Email</p>
              <h4>{user?.email}</h4>
            </div>

            <div className="relative w-full block pt-5">
              <p className="text-sm text-text/75">Phone</p>
              <h4>{user?.phone || '-'}</h4>
            </div>

            <div className="relative w-full block pt-5">
              <p className="text-sm text-text/75">Social Links</p>
              <div className="relative w-full flex gap-2 items-center mt-2">
                <button className="w-9 h-9 rounded-lg bg-bg-100 flex items-center justify-center transition-all duration-300 hover:bg-bg-100/80">
                <FaLinkedinIn />
                </button>
                <button className="w-9 h-9 rounded-lg bg-bg-100 flex items-center justify-center transition-all duration-300 hover:bg-bg-100/80">
                <FaFacebook />
                </button>
                <button className="w-9 h-9 rounded-lg bg-bg-100 flex items-center justify-center transition-all duration-300 hover:bg-bg-100/80">
                <FaX />
                </button>
                <button className="w-9 h-9 rounded-lg bg-bg-100 flex items-center justify-center transition-all duration-300 hover:bg-bg-100/80">
                <FaInstagram />
                </button>
                <button className="w-9 h-9 rounded-lg bg-bg-100 flex items-center justify-center transition-all duration-300 hover:bg-bg-100/80">
                <FaYoutube />
                </button>
              </div>
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

function ProfileYearlyChart({user}) {

  const [activeChart, setActiveChart] = useState("desktop")
  const total = useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Yearly Activity</CardTitle>
          <CardDescription>
            Showing your yearly activity
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}