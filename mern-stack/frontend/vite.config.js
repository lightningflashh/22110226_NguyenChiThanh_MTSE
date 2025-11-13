import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [react()],
  base: './', // This is important for relative paths to work correctly in production
  resolve: {
    alias: { '~': path.resolve(__dirname, 'src') }
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  }
})