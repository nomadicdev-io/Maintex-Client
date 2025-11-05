import PGSiOApi from '@api'

export async function getMetadata() {
    const res = await PGSiOApi.get('/meta')
    const data = await res.data
    return {
      meta: [
        {
          name: "title",
          content: data?.title
        },
        {
          name: "description",
          content: data?.description
        },
        {
          name: "keywords",
          content: data?.keywords
        },
        {
          name: "author",
          content: data?.author
        },
        {
          name: "creator",
          content: data?.creator
        },
        {
          name: "publisher",
          content: data?.publisher
        },
        {
          name: "category",
          content: data?.category
        },
        {
          property: 'og:title',
          content: data?.og?.title
        },
        {
          property: 'og:description',
          content: data?.og?.description
        },
        {
          property: 'og:type',
          content: data?.og?.type
        },
        {
          property: 'og:url',
          content: data?.og?.url
        },
        {
          property: 'og:image',
          content: data?.og?.image
        },
        {
          property: 'og:image:width',
          content: data?.og?.imageWidth
        },
        {
          property: 'og:image:height',
          content: data?.og?.imageHeight
        },
        {
          property: 'og:image:alt',
          content: data?.og?.imageAlt
        },
        {
          property: 'og:site_name',
          content: data?.og?.siteName
        },
        {
          property: 'og:locale',
          content: data?.og?.locale
        },
        {
          property: 'twitter:card',
          content: data?.twitter?.card
        },
        {
          property: 'twitter:site',
          content: data?.twitter?.site
        },
        {
          property: 'twitter:title',
          content: data?.twitter?.title
        },
        {
          property: 'twitter:description',
          content: data?.twitter?.description
        },
        {
          property: 'twitter:image',
          content: data?.twitter?.image
        },
        {
          property: 'twitter:image:alt',
          content: data?.twitter?.imageAlt
        }
      ],
      links: [
        {
          rel: "canonical",
          href: data?.canonical
        }
      ],
    }
}
