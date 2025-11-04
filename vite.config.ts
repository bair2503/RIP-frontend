// @ts-ignore
import { defineConfig } from 'vite'
// @ts-ignore  
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: 'http://host.docker.internal:8000',
        changeOrigin: true,
      },
    }
  },
  plugins: [react()],
})