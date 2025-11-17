import { getStaticImage } from "./getImage"

export function setMetaData(loaderData) {
    const metadata = loaderData?.metaData
    return {
      meta: [
        {
          name: 'title',
          content: metadata?.title || ''
        },
        {
          name: 'description',
          content: metadata?.description || ''
        },
        {
          name: 'keywords',
          content: metadata?.keywords || ''
        },
        {
          name: 'author',
          content: metadata?.author || ''
        },
        {
          name: 'creator',
          content: metadata?.creator || ''
        },
        {
          name: 'publisher',
          content: metadata?.publisher || ''
        },
        {
          name: 'category',
          content: metadata?.category || ''
        },
        {
          name: 'robots',
          content: metadata?.robots || ''
        },
        {
          property: 'og:title',
          content: metadata?.ogTitle
        },
        {
          property: 'og:description',
          content: metadata?.ogDescription
        },
        {
          property: 'og:type',
          content: metadata?.ogType
        },
        {
          property: 'og:url',
          content: metadata?.ogUrl
        },
        {
          property: 'og:image',
          content: getStaticImage(metadata?.ogImage?.path) || ''
        },
        {
          property: 'og:image:width',
          content: 1200
        },
        {
          property: 'og:image:height',
          content: 300
        },
        {
          property: 'og:image:alt',
          content: metadata?.ogImageAlt
        },
        {
          property: 'og:site_name',
          content: metadata?.ogSiteName
        },
        {
          property: 'og:locale',
          content: metadata?.ogLocale
        },
        {
          property: 'twitter:card',
          content: metadata?.twitterCard
        },
        {
          property: 'twitter:site',
          content: metadata?.twitterSite || ''
        },
        {
          property: 'twitter:title',
          content: metadata?.twitterTitle || ''
        },
        {
          property: 'twitter:description',
          content: metadata?.twitterDescription || ''
        },
        {
          property: 'twitter:image',
          content: getStaticImage(metadata?.twitterImage?.path) || ''
        },
        {
          property: 'twitter:image:alt',
          content: metadata?.twitterImageAlt || ''
        }
      ],
      links: [
        {
          rel: 'canonical',
          href: metadata?.canonical || window.location.origin
        }
      ]
    }
}