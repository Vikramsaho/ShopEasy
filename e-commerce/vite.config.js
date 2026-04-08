// vite.config.js   ← must be .js (or .ts if you use TypeScript)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ← this line must be here

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),   // ← call it like a function
  ],
})