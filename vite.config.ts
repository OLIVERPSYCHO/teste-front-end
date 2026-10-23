/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Encaminha /api-econverse para o domínio da Econverse, evitando CORS no dev.
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
