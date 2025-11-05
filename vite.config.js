import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import path from "path"
import { tanstackRouter } from '@tanstack/router-plugin/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
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
  optimizeDeps: {
    include: ['ajv', 'ajv-formats'],
    exclude: ['ajv-draft-04'],
    esbuildOptions: {
      resolveExtensions: ['.js', '.jsx', '.ts', '.tsx'],
    }
  },
  build: {
    outDir: 'dist',
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  server: {
    port: import.meta.env.VITE_PORT,
    open: true,
    host: true,
    proxy: {
      '/v1/app': {
        target: import.meta.env.VITE_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1\/app/, ''),
      }
    },
  },
  preview: {
    port: import.meta.env.VITE_PORT,
    open: true,
    host: true,
  },
})
