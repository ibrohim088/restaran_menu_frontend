import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import os from 'os'

const getIPv4 = () => {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return 'localhost'
}

const localIP = getIPv4()
const backendPort = 8000


export default defineConfig({
  host: '0.0.0.0',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,

    proxy: {
      '/api': {
        // Agar brauzerda localhost:5173 dan kirilsa → localhost backend
        // Agar boshqa qurilmadan kirilsa → network IP backend
        target: `http://${localIP}:${backendPort}`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
})