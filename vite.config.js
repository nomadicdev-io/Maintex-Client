import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import path from "path"
import { tanstackRouter } from '@tanstack/router-plugin/vite'

const enableRouteGeneration = process.env.ENABLE_TANSTACK_ROUTE_GENERATION !== 'false'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      enableRouteGeneration,
    }),
    react(),
    tailwindcss(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src"),
      '@assets': path.resolve(__dirname, "./src/assets"),
      '@images': path.resolve(__dirname, "./src/assets/images"),
      '@styles': path.resolve(__dirname, "./src/assets/css"),
      '@animations': path.resolve(__dirname, "./src/assets/animations"),
      '@components': path.resolve(__dirname, "./src/components"),
      '@hooks': path.resolve(__dirname, "./src/hooks"),
      '@context': path.resolve(__dirname, "./src/context"),
      '@providers': path.resolve(__dirname, "./src/providers"),
      '@store': path.resolve(__dirname, "./src/store"),
      '@routes': path.resolve(__dirname, "./src/routes"),
      '@utils': path.resolve(__dirname, "./src/utils"),
      '@lang': path.resolve(__dirname, "./src/lang"),
      '@public': path.resolve(__dirname, "./public"),
      '@auth': path.resolve(__dirname, "./src/auth"),
      '@api': path.resolve(__dirname, "./src/api"),
    },
  },
  build: {
    outDir: 'dist',
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  server: {
    port: 8808,
    proxy: {
      '/api/chat': {
        target: 'http://localhost:8880',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/v1\/ai/, ''),
      },
    },
  },
  preview: {
    port: 8808,
  },
})
