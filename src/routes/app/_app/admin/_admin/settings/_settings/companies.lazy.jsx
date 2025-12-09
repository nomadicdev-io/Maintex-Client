import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import { Button } from '@/components/ui/button'
import { Edit, Ellipsis, Globe, Mail, Phone, PlusCircleIcon, Trash } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import orbit from '@/api'
import FetchLoader from '../../../../../../../components/fetch/FetchLoader'
import FetchError from '../../../../../../../components/fetch/FetchError'
import FetchEmpty from '../../../../../../../components/fetch/FetchEmpty'
import { Activity, useCallback } from 'react'
import RefetchLoader from '../../../../../../../components/fetch/RefetchLoader'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import DefaultFormModal from '../../../../../../../components/ui/DefaultFormModal'
import { InputField, TextareaField, AttachmentUploader } from '@/components/ui/FormComponent'
import { toast } from 'sonner'
import validator from 'validator';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import RouteLoader from '../../../../../../../components/loaders/RouteLoader'
import { getS3Image } from '../../../../../../../lib/getImage'

const modelAtom = atom(false)
const selectedAtom = atom(null)

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/companies',
)({
  component: RouteComponent,
})

function RouteComponent() {


  const {data, isLoading, isError, error, isFetched, refetch, isRefetching} = useQuery({
    queryKey: ['admin-settings-companies'],
    enabled: true,
    queryFn: async () => {
      try{
        const res = await orbit.get({url: 'admin/settings/companies'})
        console.log('COMPANIES', res.data)
        return res?.data
      }catch(error){
        console.log(error)
        return null
      }
    }
  })

  if(isLoading) return <FetchLoader key="fetch-loader" />

  if(isError) return <FetchError key="fetch-error" error={error} />

  return (
    <Activity mode={isFetched ? 'visible' : 'hidden'}>
      <div className='relative w-full flex flex-col'>
        <DashboardBanner title={'Companies Management'} description={'Manage companies and details here.'}>
          <CompaniesModalForm onRefetch={refetch} />
        </DashboardBanner>
        <div className='relative w-full flex flex-col'>
          
          {
            data?.length > 0 ?
            <div className='relative w-full flex flex-col p-5'>
              <CompaniesTable data={data} onRefetch={refetch} />
            </div>
            :
            <FetchEmpty key="fetch-empty" />
          }
          {/* <CompaniesTable data={data} /> */}
        </div>
      </div>
      <Activity mode={isRefetching ? 'visible' : 'hidden'}>
        <RouteLoader key="refetch-loader" />
      </Activity>
    </Activity>
  )
}

function CompaniesModalForm({onRefetch}) {

  const [isFormLoading, setIsFormLoading] = useState(false)
  const [model, setModel] = useAtom(modelAtom)
  const selected = useAtomValue(selectedAtom)

  const form = useForm({
    defaultValues: {
      name: selected?.name || "",
      logo: selected?.logo ? [selected.logo] : [],
      email: selected?.email || "",
      phone: selected?.phone || "",
      website: selected?.website || "",
      description: selected?.description || "",
    },
    onSubmit: async ({value}) => {
      setIsFormLoading(true)
      try{
        const reqData = {
          name: value.name,
          logo: value.logo[0] ? value.logo[0] : '',
          email: value.email,
          phone: value.phone,
          website: value.website,
          description: value.description, 
        }

        let res = null
        if(selected){
          res = await orbit.post({url: `admin/settings/companies/update/${selected.id}`, data: {...reqData, id: selected.id}})
        }else{
          res = await orbit.post({url: 'admin/settings/companies', data: reqData})
        }
        if(!res?.status || res?.error) throw res
        toast.success('Company added successfully')
        form.reset()
        setModel(false)
        onRefetch()
      }catch(error){
        console.log(error)
        toast.error(error.message || error.statusText || 'Something went wrong')
      }
      finally{
        setIsFormLoading(false)
      }
    }
  })

  return (
    <DefaultFormModal 
      modalForm={form}
      onOpenChange={setModel}
      open={model}
      onClose={() => setModel(false)}
      title={selected ? 'Update Company Details' : 'Add New Company'}
      description={selected ? 'Update the company details here.' : 'Complete the form to add a new company details.'}
      classNames={{
        content: "max-w-[32.5rem] min-w-[32.5rem]"
      }}
      handleSubmit={form.handleSubmit}
      isLoading={isFormLoading}
      button={
        <Button variant='shade' onClick={() => setModel(true)}>
          <PlusCircleIcon />
          <span>Add New Company</span>
        </Button>
      }
      submitButtonText={selected ? 'Update' : 'Create'}
    >
          <form 
            onSubmit={e=> {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }} 
            className="relative w-full grid grid-cols-2 gap-y-6 gap-x-5 p-5"
            autoComplete="off"
            noValidate
          >
            <form.Field 
              name="name" 
              validators={{
                onChange: ({ value }) => value === "" ? 'Name is required' : undefined,
              }}
              children={(field) => (
                <InputField 
                  label="Name" 
                  name="name" 
                  type="text" 
                  placeholder="Example Company...." 
                  className="col-span-1"
                  autoComplete="organization"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field?.state?.meta?.errors?.join(', ')}
                  isError={field?.state?.meta?.errors?.length > 0}
                />
              )} 
            />
            <form.Field 
              name="email" 
              validators={{
                onChange: ({ value }) => value === "" ? 'Email is required' : !validator.isEmail(value) ? 'Invalid email address' : undefined,
              }}
              children={(field) => (
                <InputField 
                  label="Email" 
                  name="email" 
                  type="email" 
                  placeholder="example@company.com" 
                  className="col-span-1"
                  autoComplete="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field?.state?.meta?.errors?.join(', ')}
                  isError={field?.state?.meta?.errors?.length > 0}
                />
              )} 
            />
            <form.Field 
              name="phone" 
              validators={{
                onChange: ({ value }) => {
                  if (value === "") return 'Phone is required';
                  const phoneRegex = /^(\+?\d{7,15})$/;
                  if (!phoneRegex.test(value.replace(/[\s\-]/g, ""))) {
                    return 'Invalid phone number';
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <InputField 
                  label="Phone" 
                  name="phone" 
                  type="tel" 
                  placeholder="+971 000 000 000" 
                  className="col-span-1"
                  autoComplete="tel"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field?.state?.meta?.errors?.join(', ')}
                  isError={field?.state?.meta?.errors?.length > 0}
                />
              )} 
            />
            <form.Field 
              name="website" 
              validators={{
                onChange: ({ value }) => {
                  const websiteRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/?#].*)?$/;
                  if (value && !websiteRegex.test(value)) {
                    return 'Invalid website URL';
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <InputField 
                  label="Website" 
                  name="website" 
                  type="url" 
                  placeholder="https://www.example.com" 
                  className="col-span-1"
                  autoComplete="url"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field?.state?.meta?.errors?.join(', ')}
                  isError={field?.state?.meta?.errors?.length > 0}
                />
              )} 
            />
            <form.Field 
              name="description" 
              children={(field) => (
                <TextareaField 
                  label="Description" 
                  name="description" 
                  className="col-span-2"
                  placeholder="Enter the description of the ticket"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field?.state?.meta?.errors?.join(', ')}
                  isError={field?.state?.meta?.errors?.length > 0}
                />
                
              )} 
            />

            <form.Field 
              name="logo" 
              children={(field) => (
                <AttachmentUploader 
                  label="Company Logo"
                  className="col-span-2" 
                  name="logo" 
                  value={field.state.value} 
                  onChange={field.handleChange} 
                  error={field?.state?.meta?.errors?.join(', ')} 
                  isError={field?.state?.meta?.errors?.length > 0} 
                  maxFileSize={1024 * 1024 * 5}
                  accept="image/*"
                  classNames={{grid: "grid-cols-4"}}
                  isSingle={true}
                  bucket="maintex"
                />
              )} 
            />


          </form>
        
    </DefaultFormModal>
  )
}

function CompaniesTable({data, onRefetch}) {

  return (
    <div className="relative grid grid-cols-2 gap-5 w-full">
      {
        data?.map((item) => (
          <CompanyItem key={item?._id} item={item} onRefetch={onRefetch} />
        ))
      }
    </div>
  )
}

function CompanyItem({item, onRefetch}) {

  const setSelected = useSetAtom(selectedAtom)
  const setModal = useSetAtom(modelAtom)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const handleEdit = useCallback(() => {
    setSelected(item)
    setModal(true)
  }, [item, setSelected, setModal])

  const handleDelete = useCallback(() => {
    setIsDeleteDialogOpen(true)
  }, [item])

  const handleDeleteConfirm = async () => {
    setIsDeleteLoading(true)
    try{
      const res = await orbit.post({url: `admin/settings/companies/delete/${item.id}`})
      if(!res.status) throw res
      toast.success('Company deleted successfully')
      onRefetch()
    }
    catch(error){
      console.log(error)
      toast.error(error.message || error.statusText || 'Something went wrong')
    }
    finally{
      setIsDeleteLoading(false)
    }
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="relative w-full flex flex-col border border-border-600 rounded-xl bg-bg-300">
      <div className="relative w-full flex gap-4 items-start p-4">
        <div className="relative w-full flex-1">
          <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
          {
            item.website ?
            <div className="relative w-full flex gap-2 items-center">
              <Globe opacity={0.75} size={14} />
              <p className="text-sm text-muted-foreground text-text/65 leading-6"> {item.website}</p>
            </div>
            : null
          }
          {
            item.email ?
            <div className="relative w-full flex gap-2 items-center">
              <Mail opacity={0.75} size={14} />
              <p className="text-sm text-muted-foreground text-text/65 leading-6"> {item.email}</p>
            </div>
            : null
          }
          {
            item.phone ?
            <div className="relative w-full flex gap-2 items-center">
              <Phone opacity={0.75} size={14} />
              <p className="text-sm text-muted-foreground text-text/65 leading-6"> {item.phone}</p>
            </div>
            : null
          }
          
        </div>
        {
          item.logo ?
          <div className="relative w-22.5 h-22.5 overflow-hidden border border-border-600 rounded-lg bg-bg-100/50 flex items-center justify-center">
            <img src={getS3Image(item.logo.key, item.logo.bucket)} alt={item.name} className="w-[80%] h-auto object-contain" />
          </div>
          : null
        }
        
      </div>
      {
        item.description ?
          <div className="relative w-full flex gap-3 border-t border-t-border px-4 py-3" >
              <p className="text-xs text-muted-foreground flex-1 w-full text-text/30 truncate">{item.description}</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-xs text-text/75 hover:text-text/100 transition-all duration-300 cursor-pointer" title="Edit company" type="button">
                  <Ellipsis size={24} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={handleEdit}><Edit /> Edit</DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleDelete}><Trash /> Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
          </div>
        : null
      }

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="shade" >Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant='default' onClick={handleDeleteConfirm} isLoading={isDeleteLoading} >Continue</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}