import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Resources for different languages
const resources = {
  en: {
    translation: {
      welcome: "Welcome to our application",
      about: "About Us",
      home: "Home",
      posts: "Posts",
      "post-details": "Post Details",
      "go-back": "Go Back",
    }
  },
  es: {
    translation: {
      welcome: "Bienvenido a nuestra aplicación",
      about: "Sobre Nosotros",
      home: "Inicio",
      posts: "Publicaciones",
      "post-details": "Detalles de la Publicación",
      "go-back": "Volver",
    }
  },
  fr: {
    translation: {
      welcome: "Bienvenue dans notre application",
      about: "À Propos",
      home: "Accueil",
      posts: "Articles",
      "post-details": "Détails de l'Article",
      "go-back": "Retour",
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'fr'],
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    }
  })

export default i18n