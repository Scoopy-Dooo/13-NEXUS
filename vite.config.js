import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['og-image.png'],
      manifest: {
        name: 'NEXUS — The Future of Social Networking',
        short_name: 'NEXUS',
        description: 'A modern dark-themed social networking platform.',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/home',
        icons: [
          { src: 'og-image.png', sizes: '192x192', type: 'image/png' },
          { src: 'og-image.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-ui': ['@heroui/react', 'framer-motion'],
          'vendor-query': ['@tanstack/react-query'],
        },
      },
    },
  },
})
