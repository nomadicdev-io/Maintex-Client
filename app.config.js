const appConfig = {
  port: import.meta.env.VITE_PORT,
  apiUrl: import.meta.env.VITE_API_URL,
  authUrl: import.meta.env.VITE_AUTH_URL,
  appVersion: import.meta.env.VITE_APP_VERSION,
  env: import.meta.env.VITE_NODE_ENV,
  debug: import.meta.env.VITE_DEBUG,
  metadata: {
    title: "Maintex Pro – The Developer Sandbox",
    description: "Maintex Pro is the internal developer platform where innovation meets collaboration. Build freely, share fearlessly, and shape the future of code – together.",
    keywords: "developer platform, internal tools, code collaboration, sandbox, PGS, engineering culture, dev community",
    author: "PGS Developer Experience Team",
    themeColor: "#0A192F", // Dark theme primary color
    og: {
      title: "Maintex Pro – The Developer Sandbox",
      type: "website",
      url: "https://pgs.io", // Replace with actual internal URL if needed
      image: "https://storage.devpgs.app/u/FQLiUn.png", // Replace with your OG image
      description: "Explore, experiment, and collaborate in Maintex Pro — the internal dev sandbox built by and for engineers at PGS."
    },
    twitter: {
      card: "summary_large_image",
      site: "@PGS_Dev", // Optional internal or placeholder handle
      title: "Maintex Pro – The Developer Sandbox",
      description: "Collaborate, create, and grow inside Maintex Pro — your private dev playground.",
      image: "https://storage.devpgs.app/u/FQLiUn.png" // Match Open Graph image
    }
  },
  footer: {
    copyright: "Maintex Pro © " + new Date().getFullYear() + ' | Builtrite Group All Rights Reserved',
  }
}

export default appConfig