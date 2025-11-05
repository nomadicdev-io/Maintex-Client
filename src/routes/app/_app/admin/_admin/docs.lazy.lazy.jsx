import { createLazyFileRoute } from '@tanstack/react-router'
import { ApiReferenceReact } from '@scalar/api-reference-react'
import '@scalar/api-reference-react/style.css'
import '@styles/partials/swagger-dark.scss'
import DashboardBanner from '@components/sections/DashboardBanner'

export const Route = createLazyFileRoute('/app/_app/admin/_admin/docs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='relative w-full block '>
      <DashboardBanner title={'Open API Documentation'} description={'API documentation for the application. You can change the docs here.'}/>
      <ApiReferenceReact
        configuration={{
          url: import.meta.env.VITE_DOCS_URL,
          documentDownloadType: 'json',
          theme: 'default',
          darkMode: true
        }}
        
      />
    </div>

  )
}