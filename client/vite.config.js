import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir: '../src/public',
    emptyOutDir: true
  },
  server: {
    port: process.env.PORT || 5173,
    host: true,
  },
})
