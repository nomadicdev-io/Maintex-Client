import { useTranslation } from "react-i18next"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select"
import { useQueryClient } from "@tanstack/react-query"

export default function LanguageSwitcher(){

    const { i18n } = useTranslation()
    const queryClient = useQueryClient()

    const data = queryClient.getQueryData(['global-context'])

    const handleLanguageChange = (lng) => {
      
      i18n.changeLanguage(lng)
      if(lng === 'ar') {
        document.dir = 'rtl'
      } else {
        document.dir = 'ltr'
      }
    }
  
    return (
      <Select defaultValue={i18n.language} onValueChange={handleLanguageChange}>
        <SelectTrigger variant="shade">
          <SelectValue />
        </SelectTrigger>
        <SelectContent  >
          <SelectGroup>
            {
              data?.lang?.languages?.map((language) => (
                <SelectItem key={language.value} value={language.value}>{language.flag} &nbsp; {language.label}</SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }
  