import { create } from "zustand";
import { useRouter } from "@tanstack/react-router";
import { authClient } from "../auth";
import { atom, useAtom } from "jotai";

const logoutLoaderAtom = atom(false)

export const useAuthStore = function(){

    const router = useRouter()
    const [isLogouting, setIsLogouting] = useAtom(logoutLoaderAtom)

    const logout = async () => {
      setIsLogouting(true)
      try{
        await authClient.signOut()
        // router.update({
        //   context: {
        //     session: null,
        //     token: null,
        //     user: null,
        //     isAuthenticated: false,
        //   }
        // })
        await router.invalidate()
        router.navigate({to: '/', replace: true})
        return true;
      }catch(error){
        console.log(error)
        return false;
      }finally{
        setIsLogouting(false)
      }
    }

    return {
      logout,
      isLogouting,
    }

}