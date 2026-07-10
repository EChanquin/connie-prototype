import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// The dev server proxies /langflow -> your Langflow instance and injects the API key
// server-side, so the browser never sees the key and there are no CORS issues.
// Set LANGFLOW_URL and LANGFLOW_API_KEY in .env.local (see .env.example).
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const LANGFLOW_URL = env.LANGFLOW_URL || 'http://localhost:7860'
  const LANGFLOW_API_KEY = env.LANGFLOW_API_KEY || ''

  return {
    plugins: [react()],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
    server: {
      proxy: {
        '/langflow': {
          target: LANGFLOW_URL,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/langflow/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (LANGFLOW_API_KEY) proxyReq.setHeader('x-api-key', LANGFLOW_API_KEY)
            })
          },
        },
      },
    },
  }
})
