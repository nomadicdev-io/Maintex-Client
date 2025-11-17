import { createAuthClient } from "better-auth/react"
import { twoFactorClient, adminClient, inferAdditionalFields } from "better-auth/client/plugins"

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
      return {
        session: data?.session,
        token: data?.session?.token,
        user: data?.session?.user,
        isAuthenticated: data?.session?.token ? true : false,
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