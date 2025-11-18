import { createAuthClient } from "better-auth/react"
import { twoFactorClient, adminClient, inferAdditionalFields } from "better-auth/client/plugins"
import orbit from "../api"
import i18n from "../lang"

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_AUTH_URL,
    plugins: [
      twoFactorClient(),
      adminClient(),
      inferAdditionalFields({
        user: {
          image:      { type: "object", required: false },
          bannerImage: { type: "object", required: false },
          designation: { type: "string", required: false },
          country:     { type: "string", required: false },
          address:     { type: "string", required: false },
          phone:       { type: "string", required: false },
          phoneCode:   { type: "string", required: false },
          gender:      { type: "string", required: false },
          bio:         { type: "string", required: false },
          role:        { type: "string", required: false },
          status:      { type: "string", required: false },            
        }
      })
    ],
    fetchOptions: {
        headers: {
            'X-App-Secret': import.meta.env.VITE_APP_SECRET_KEY
        }
    } 
})

export const initAuthStore = async ()=> {
    try{
      const {data} = await authClient.getSession()
      const res = await orbit.get({url: 'context'})

      if(i18n.language === 'ar') {
        document.dir = 'rtl'
      } else {
        document.dir = 'ltr'
      }

      return {
        session: data?.session,
        token: data?.session?.token,
        user: data?.session?.user,
        isAuthenticated: data?.session?.token ? true : false,
        context: res?.data || null,
      }
    }catch(error){
      console.log(error)
      return {
        session: null,
        token: null,
        user: null,
      }
    }
}