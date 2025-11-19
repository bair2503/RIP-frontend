import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';
import * as fs from 'fs';
import * as path from 'path';

const __dirnameLocal = path.resolve();

export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Вычислительный калькулятор',
        short_name: 'Калькулятор',
        description: 'Производите сложные математические вычисления с легкостью',
        start_url: '/RIP-frontend/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ff3333',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/logo192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: '/logo512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
      },
    }),
  ],
  base: '/RIP-frontend/',
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirnameLocal, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirnameLocal, 'cert.crt')),
    },
    host: '0.0.0.0',
    port: 3000, // ← ИЗМЕНЕНО НА 3000
    strictPort: true, // Запрещаем автоматическую смену порта
    proxy: {
      '/api': {
        target: 'http://192.168.1.50:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('❌ Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('🔄 Proxy Request to backend:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('✅ Proxy Response from backend:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
  preview: {
    port: 3000, // Порт для preview
    host: '0.0.0.0'
  }
});