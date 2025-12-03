import { useTranslation } from "react-i18next"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select"

export default function LanguageSwitcher({data}){

    const { i18n } = useTranslation()
  
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
              data?.languages?.map((language) => (
                <SelectItem key={language.value} value={language.value}>{language.flag} &nbsp; {language.label}</SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }
  