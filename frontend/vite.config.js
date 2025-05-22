import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://med-sync-6o63.vercel.app/', 
        changeOrigin: true,
      }
    },
  },
})
