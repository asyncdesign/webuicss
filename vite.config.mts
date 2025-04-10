import path from "path"
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@asyncdesign': path.resolve(__dirname, './src/webui/js'),
      '@asyncdesign-css': path.resolve(__dirname, './src/webui/css')
    }
  },
  plugins: [
    tailwindcss(),
  ],
})
