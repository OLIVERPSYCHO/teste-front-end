/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// O JSON de produtos fica em outro dominio. O proxy abaixo expoe o caminho
// `/api-econverse` no servidor local (dev e preview), evitando bloqueio de CORS.
// A aplicacao so usa esse caminho quando VITE_API_ORIGIN esta definida
// (ver .env.development e .env.example).
const econverseProxy = {
  '/api-econverse': {
    target: 'https://app.econverse.com.br',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api-econverse/, ''),
  },
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: econverseProxy,
  },
  preview: {
    proxy: econverseProxy,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
