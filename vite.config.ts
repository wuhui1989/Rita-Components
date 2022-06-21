
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import shimReactPdf from "vite-plugin-shim-react-pdf";
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir:resolve(__dirname,'public'),
  plugins: [ react(),reactRefresh(),shimReactPdf()],
  resolve: {
    alias: [{find: '@', replacement: resolve(__dirname, 'src')}]
  }
})
