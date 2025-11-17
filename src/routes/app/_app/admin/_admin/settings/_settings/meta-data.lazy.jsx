import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'
import DataField from '@/components/ui/DataField'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Lock } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import FetchLoader from '../../../../../../../components/fetch/FetchLoader'
import FetchError from '../../../../../../../components/fetch/FetchError'
import { Activity } from 'react'
import RouteLoader from '../../../../../../../components/loaders/RouteLoader'
import { useQuery } from '@tanstack/react-query'
import orbit from '@/api'
import { InputField, TextareaField, InputCountry } from '@/components/ui/FormComponent'


export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/meta-data',
)({
  component: RouteComponent,
})

function RouteComponent() {

  const {data, isLoading, isError, error, isFetched, refetch, isRefetching} = useQuery({
    queryKey: ['admin-settings-meta-data'],
    enabled: true,
    queryFn: async () => {
      try{
        const res = await orbit.get({url: 'admin/settings/meta-data'})
        console.log('SETTINGS META DATA', res)
        return res?.data
      }catch(error){
        console.log('SETTINGS META DATA ERROR', error)
        return null
      }
    }
  })

  if(isLoading) return <FetchLoader key="fetch-loader" />
  if(isError) return <FetchError key="fetch-error" error={error} />

  return (
    <Activity mode={isFetched ? 'visible' : 'hidden'}>
      <div className='relative w-full flex flex-col'>
        <DashboardBanner title={'Meta Data'} description={'Meta data settings for the application. You can change the meta data here.'} />
        <MetaDataForm data={data} onRefetch={refetch} />
      </div>
      <Activity mode={isRefetching ? 'visible' : 'hidden'}>
        <RouteLoader key="refetch-loader" />
      </Activity>
    </Activity>
  )
}

const MetaDataForm = ({data, onRefetch}) => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
      keywords: data?.keywords || '',
      author: data?.author || '',
      creator: data?.creator || '',
      publisher: data?.publisher || '',
      category: data?.category || '', 
      canonical: data?.canonical || '',
      robots: data?.robots || '',
      ogTitle: data?.ogTitle || '',
      ogDescription: data?.ogDescription || '',
      ogType: data?.ogType || '',
      ogUrl: data?.ogUrl || '',
      ogImage: data?.ogImage || '',
      ogImageAlt: data?.ogImageAlt || '',
      ogSiteName: data?.ogSiteName || '',
      ogLocale: data?.ogLocale || '',
      twitterCard: data?.twitterCard || '',
      twitterTitle: data?.twitterTitle || '',
      twitterDescription: data?.twitterDescription || '',
      twitterImage: data?.twitterImage || '',
      twitterImageAlt: data?.twitterImageAlt || '',
    },
    onSubmit: async ({value}) => {
      setIsLoading(true)
      console.log(value)
    }
  })

  return (
    <form 
    onSubmit={e=> {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    }}
    className='relative w-full flex flex-col'>
      
      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) => value === "" ? 'Title is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Title"
            description="The title of the page"
          >
            <InputField 
              name="title"
              placeholder="Enter the title of the page (e.g. Maintex Pro - Advanced Service Management Dashboard | Builtrite Group)"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />

      <form.Field
        name="description"
        validators={{
          onChange: ({ value }) => value === "" ? 'Description is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Description"
            description="A brief description of the page for search engines and social media"
          >
            <TextareaField 
              name="description"
              placeholder="Enter the description of the page.."
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />  

      <form.Field
        name="keywords"
        validators={{
          onChange: ({ value }) => value === "" ? 'Keywords is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Keywords"
            description="Comma-separated keywords for SEO purposes"
          >
            <TextareaField 
              name="keywords"
              placeholder="SEO Keywords..."
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />

      <form.Field
        name="author"
        validators={{
          onChange: ({ value }) => value === "" ? 'Author is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Author"
            description="The author or creator of the page content"
          >
            <InputField 
              name="author"
              placeholder="Enter the author of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            error={field?.state?.meta?.errors?.join(', ')}
            isError={field?.state?.meta?.errors?.length > 0}
          />
          </DataField>
        )}
      />

      <form.Field
        name="creator"
        validators={{
          onChange: ({ value }) => value === "" ? 'Creator is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Creator"
            description="The creator of the page or content"
          >
            <InputField 
              name="creator"
              placeholder="Enter the creator of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
              disabled={true}
              endContent={<Lock size={16} opacity={0.25}/>}
            />
          </DataField>
        )}
      />
      <form.Field
        name="publisher"
        validators={{
          onChange: ({ value }) => value === "" ? 'Publisher is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Publisher"
            description="The publisher or organization responsible for the content"
          >
            <InputField 
              name="publisher"
              placeholder="Enter the publisher of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
              disabled={true}
              endContent={<Lock size={16} opacity={0.25}/>}
            />
          </DataField>
        )}
      />  

      <form.Field
        name="category"
        validators={{
          onChange: ({ value }) => value === "" ? 'Category is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Category"
            description="The category or topic classification of the page"
          >
            <InputField 
              name="category"
              placeholder="Enter the category of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
              disabled={true}
              endContent={<Lock size={16} opacity={0.25}/>}
            />
          </DataField>
        )}
      />
        <form.Field
        name="ogDescription"
        validators={{
          onChange: ({ value }) => value === "" ? 'OG Description is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="OG Description"
            description="The description shown in social media previews"
          >
            <TextareaField 
              name="ogDescription"
              placeholder="Enter the OG description of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />

      <form.Field
        name="ogType"
        validators={{
          onChange: ({ value }) => value === "" ? 'OG Type is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="OG Type"
            description="The type of content (e.g., website, article, video)"
          >

            <InputField 
              name="ogType"
              placeholder="Enter the OG type of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />

      <form.Field
        name="ogImage"
        validators={{
          onChange: ({ value }) => value === "" ? 'OG Image is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="OG Image"
            description="The image displayed when the page is shared on social media" 
          >
            <InputField 
              name="ogImage"
              placeholder="Enter the OG image of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />
      
      <form.Field
        name="ogImageAlt"
        validators={{
          onChange: ({ value }) => value === "" ? 'OG Image Alt is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="OG Image Alt"
            description="Alternative text for the Open Graph image"
          >
            <InputField 
              name="ogImageAlt"
              placeholder="Enter the OG image alt of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />

      <form.Field
        name="ogSiteName"
        validators={{
          onChange: ({ value }) => value === "" ? 'OG Site Name is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="OG Site Name"
            description="The name of the website or application"
          >
            <InputField 
              name="ogSiteName"
              placeholder="Enter the OG site name of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />

      <form.Field
        name="ogLocale"
        validators={{
          onChange: ({ value }) => value === "" ? 'OG Locale is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="OG Locale"
            description="The locale or language of the content (e.g., en_US, fr_FR)"
          >
            <InputField 
              name="ogLocale"
              placeholder="Enter the OG locale of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
              disabled={true}
              endContent={<Lock size={16} opacity={0.25}/>}
            />
          </DataField>
        )}
      />

      <form.Field
        name="twitterCard"
        validators={{
          onChange: ({ value }) => value === "" ? 'Twitter Card is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Twitter Card"
            description="The type of Twitter card (summary, summary_large_image, etc.)"
          >
            <InputField 
              name="twitterCard"
              placeholder="Enter the Twitter card of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
              disabled={true}
              endContent={<Lock size={16} opacity={0.25}/>}
            />
          </DataField>
        )}
      />

      <form.Field
        name="twitterTitle"
        validators={{
          onChange: ({ value }) => value === "" ? 'Twitter Title is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Twitter Title"
            description="The title displayed when the page is shared on Twitter"
          >
            <InputField 
              name="twitterTitle"
              placeholder="Enter the Twitter title of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />
      <form.Field
        name="twitterImage"
        validators={{
          onChange: ({ value }) => value === "" ? 'Twitter Image is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Twitter Image"
            description="The image displayed when the page is shared on Twitter"
          >
            <InputField 
              name="twitterImage"
              placeholder="Enter the Twitter image of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />
      <form.Field
        name="twitterDescription"
        validators={{
          onChange: ({ value }) => value === "" ? 'Twitter Description is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Twitter Description"
            description="The description shown in Twitter card previews"
          >
            <TextareaField 
              name="twitterDescription"
              placeholder="Enter the Twitter description of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />
      <form.Field
        name="twitterImageAlt"
          validators={{
          onChange: ({ value }) => value === "" ? 'Twitter Image Alt is required' : undefined,
        }}
        children={(field) => (
          <DataField
            label="Twitter Image Alt"
            description="Alternative text for the Twitter card image"
          >
            <InputField 
              name="twitterImageAlt"
              placeholder="Enter the Twitter image alt of the page"
              className="max-w-100"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field?.state?.meta?.errors?.join(', ')}
              isError={field?.state?.meta?.errors?.length > 0}
            />
          </DataField>
        )}
      />

      <div className='relative w-full flex gap-3 px-5 py-8'>
        <Button type="button" variant="shade" onClick={()=> router.history?.back()}>
          <span>Cancel</span>
        </Button>
        <Button type="submit" isLoading={isLoading}>
          <CheckCircle2 />
          <span>Update Meta Data</span>
        </Button>
      </div>

    </form>
  )
}
