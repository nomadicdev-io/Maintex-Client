import { useMemo } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@/components/sections/DashboardBanner'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  UploadCloud,
  FolderPlus,
  Folder,
  FileText,
  FileSpreadsheet,
  Video,
  Archive,
  Image as ImageIcon,
  Music,
} from 'lucide-react'
import SearchBar from '../../../../../components/ui/SearchBar'
import { HiFolderOpen } from "react-icons/hi2";

const usage = {
  total: 256,
  used: 104.6,
}

const files = [
  {
    id: 'file-1',
    name: 'Q3_brand_guidelines.pdf',
    type: 'Document',
    category: 'documents',
    icon: FileText,
    size: '2.7 MB',
    modified: 'Apr 18, 2025',
    path: 'Design/Brand',
  },
  {
    id: 'file-2',
    name: 'Growth_forecast_2025.xlsx',
    type: 'Spreadsheet',
    category: 'spreadsheets',
    icon: FileSpreadsheet,
    size: '1.9 MB',
    modified: 'Apr 16, 2025',
    path: 'Finance/Forecasts',
  },
  {
    id: 'file-3',
    name: 'Launch-teaser.mp4',
    type: 'Video',
    category: 'media',
    icon: Video,
    size: '153 MB',
    modified: 'Apr 12, 2025',
    path: 'Media/Launch',
  },
  {
    id: 'file-4',
    name: 'Campaign_assets.zip',
    type: 'Archive',
    category: 'archives',
    icon: Archive,
    size: '512 MB',
    modified: 'Apr 09, 2025',
    path: 'Archive/Campaigns',
  },
  {
    id: 'file-5',
    name: 'Product_specifications_v4.pdf',
    type: 'Document',
    category: 'documents',
    icon: FileText,
    size: '3.4 MB',
    modified: 'Apr 05, 2025',
    path: 'Product/Specs',
  },
  {
    id: 'file-6',
    name: 'Team_capacity_planner.xlsx',
    type: 'Spreadsheet',
    category: 'spreadsheets',
    icon: FileSpreadsheet,
    size: '2.1 MB',
    modified: 'Apr 01, 2025',
    path: 'Operations/Planning',
  },
]

const folderCollections = [
  {
    id: 'folder-brand',
    name: 'Brand Assets',
    items: 128,
    description: 'Shared • Updated 2 days ago',
    accent: 'from-emerald-400/20 via-emerald-400/10 to-transparent',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'folder-product',
    name: 'Product Roadmaps',
    items: 64,
    description: 'Private • Updated yesterday',
    accent: 'from-sky-400/20 via-sky-400/10 to-transparent',
    iconColor: 'text-sky-400',
  },
  {
    id: 'folder-finance',
    name: 'Finance Reports',
    items: 64,
    description: 'Private • Updated yesterday',
    accent: 'from-amber-400/20 via-amber-400/10 to-transparent',
    iconColor: 'text-amber-300',
  },
  {
    id: 'folder-media',
    name: 'Marketing Media',
    items: 312,
    description: 'Shared • Updated 4 hours ago',
    accent: 'from-purple-400/20 via-purple-400/10 to-transparent',
    iconColor: 'text-purple-300',
  },
  {
    id: 'folder-ops',
    name: 'Operations',
    items: 58,
    description: 'Private • Updated 5 days ago',
    accent: 'from-amber-400/20 via-amber-400/10 to-transparent',
    iconColor: 'text-amber-300',
  },
]

const storageBreakdown = [
  {
    id: 'documents',
    label: 'Documents',
    files: '870 files',
    size: '6.20 GB',
    icon: FileText,
  },
  {
    id: 'images',
    label: 'Images',
    files: '1,150 files',
    size: '18.30 GB',
    icon: ImageIcon,
  },
  {
    id: 'video',
    label: 'Videos',
    files: '320 files',
    size: '28.45 GB',
    icon: Video,
  },
  {
    id: 'audio',
    label: 'Audio',
    files: '430 files',
    size: '10.25 GB',
    icon: Music,
  },
  {
    id: 'archives',
    label: 'Archives',
    files: '95 files',
    size: '2.92 GB',
    icon: Archive,
  },
]

export const Route = createLazyFileRoute('/app/_app/account/_account/drive')({
  component: RouteComponent,
})

function RouteComponent() {
  const filteredFiles = files

  const usagePercent = Math.min(100, Math.round((usage.used / usage.total) * 100))
  const gaugeBackground = useMemo(() => {
    const angle = Math.min(360, usagePercent * 3.6)
    return `conic-gradient(from 180deg, rgba(209,213,219,0.85) ${angle}deg, rgba(75,85,99,0.1) ${angle}deg)`
  }, [usagePercent])

  return (
    <ScrollArea className='relative h-full'>
      <div className='relative flex h-full flex-col pb-12'>
        <DashboardBanner
          title='Personal Space & Cloud Storage'
          description='Manage uploads and keep an eye on your personal storage usage.'
          className='supports-[backdrop-filter]:bg-bg/40'
        >
          <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <SearchBar />
            <div className='flex items-center gap-2'>
              <Button variant='shade'>
                <UploadCloud className='size-4' />
                Upload files
              </Button>
              <Button variant='shade'>
                <FolderPlus className='size-4' />
                New folder
              </Button>
            </div>
          </div>
        </DashboardBanner>

        <main className='relative mx-auto flex w-full flex-col gap-8 lg:h-full lg:flex-row lg:items-start lg:gap-12'>

          <section className='flex w-full flex-1 flex-col gap-8 px-6 py-8'>
            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5'>
              {folderCollections.map((folder) => (
                <div
                  key={folder.id}
                  className='group flex flex-col items-center gap-3 rounded-xl border border-transparent bg-bg-100/15 px-4 pb-5 py-4 text-center transition hover:border-border/50 hover:bg-bg-100/20'
                >
                  <div className='flex size-16 items-center justify-center rounded-[1rem] border border-transparent text-text/50 transition group-hover:border-border/50 group-hover:bg-bg-300/30 group-hover:text-text'>
                    <HiFolderOpen className='size-20' />
                  </div>
                  <div className='space-y-1'>
                    <p className='text-sm font-semibold text-text'>{folder.name}</p>
                    <p className='text-xs text-text/55'>{folder.items} items</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5'>
              {filteredFiles.map((file) => {
                const Icon = file.icon

                return (
                  <div
                    key={file.id}
                        className='group flex flex-col items-center gap-3 rounded-xl border border-transparent bg-bg-100/15 px-4 pb-5 py-4 text-center transition hover:border-border/50 hover:bg-bg-100/20'
                  >
                    <div className='flex size-16 items-center justify-center rounded-[1rem] border border-transparent text-text/60 transition group-hover:border-border/50 group-hover:bg-bg-300/25 group-hover:text-text'>
                      <Icon className='size-20' />
                    </div>
                    <div className='space-y-1'>
                      <p className='truncate text-sm font-semibold text-text'>{file.name}</p>
                      <p className='text-xs text-text/55'>{file.size} • {file.modified}</p>
                      <p className='text-xs text-text/45'>{file.path}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <aside className='w-full border-t border-border-600/60 bg-bg-300/20 px-6 py-8 lg:w-[320px] lg:shrink-0 lg:border-l lg:border-t-0'>
              <div className='space-y-6'>
                <div className='rounded-2xl border border-border/40 bg-bg-300/25 p-6 text-center'>
                  <h3 className='text-sm font-semibold uppercase tracking-[0.18em] text-text/65'>Cloud Storage</h3>

                <div className='relative mx-auto mt-6 h-40 w-40'>
                  <div
                    className='absolute inset-0 rounded-full'
                    style={{ background: gaugeBackground }}
                  />
                  <div className='absolute inset-4 rounded-full bg-bg-300/90 backdrop-blur-sm' />
                  <div className='relative z-10 flex h-full flex-col items-center justify-center gap-1 rounded-full bg-transparent'>
                    <span className='text-2xl font-semibold text-text'>{usage.used.toFixed(2)} GB</span>
                    <span className='text-xs text-text/55'>Used of {usage.total} GB</span>
                    <span className='text-xs font-medium text-text/70'>{usagePercent}% utilised</span>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                {storageBreakdown.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.id}
                      className='group flex items-center gap-3 rounded-2xl border border-transparent bg-bg-100/15 px-4 pb-5 py-4 transition hover:border-border/50 hover:bg-bg-100/20'
                    >
                      <div className='flex size-10 items-center justify-center rounded-xl border border-transparent text-text/60 transition group-hover:border-border/50 group-hover:bg-bg-300/30 group-hover:text-text'>
                        <Icon className='size-20' />
                      </div>
                      <div>
                        <p className='text-sm font-medium text-text'>{item.label}</p>
                        <p className='text-xs text-text/55'>
                          {item.files} • {item.size}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className='rounded-2xl border border-dashed border-border/60 bg-bg-300/18 p-6 text-center'>
                <div className='mx-auto flex size-12 items-center justify-center rounded-full border border-border/50 bg-bg-300/25 text-text/65'>
                  <UploadCloud className='size-20' />
                </div>
                <h4 className='mt-4 text-sm font-semibold text-text'>Upload your files</h4>
                <p className='mt-1 text-xs text-text/55'>Drag and drop files here or browse from your device.</p>
                <Button variant='outline' size='sm' className='mt-4 rounded-full px-5 text-xs font-medium text-text/75'>
                  Browse
                </Button>
              </div>
            </div>
          </aside>

        </main>

      </div>
    </ScrollArea>
  )
}
