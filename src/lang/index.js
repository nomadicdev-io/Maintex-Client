import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locals/en.json'
import es from './locals/es.json'
import fr from './locals/fr.json'
import ru from './locals/ru.json'
import it from './locals/it.json'
import ar from './locals/ar.json'

// Resources for different languages
const resources = {
  en: en,
  es: es,
  fr: fr,
  ru: ru,
  it: it,
  ar: ar
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar', 'it', 'ru', 'fr', 'es'],
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      excludeCacheFor: ['cimode']
    },
    react: {
      useSuspense: false
    },
    debug: false,
    nsSeparator: false,
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n