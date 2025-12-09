import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@/components/sections/DashboardBanner'
import DataField from '@/components/ui/DataField'
import { Button } from '../../../../../components/ui/button'
import { Bot, RadioIcon } from 'lucide-react'
import { orbitAI } from '../../../../../api'
import { socketManager } from '../../../../__root'

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

  const handleSocketSubscribe = () => {
    socketManager.subscribe('active-users', (data) => {
      console.log(data)
    })
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
            <Button variant="whiteShade" onClick={handleAITest}>
              <Bot />
              <span>Test AI</span>
            </Button>
          </DataField>

          <DataField
            label="Socket Subscribe"
          >
            <Button variant="whiteShade" onClick={handleSocketSubscribe}>
              <RadioIcon />
              <span>Subscribe</span>
            </Button>
          </DataField>
        </div>
      </div>
    </div>
  )
}