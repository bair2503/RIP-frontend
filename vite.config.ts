import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Измените на '/' для локальной разработки
  server: {
    port: 3000, // Используем стандартный порт
    host: true, // Доступ с других устройств
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
  }
})