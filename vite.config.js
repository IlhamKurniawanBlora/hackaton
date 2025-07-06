import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.VITE_APP_SUPABASE_URL,
      supabaseAnonKey: process.env.VITE_APP_SUPABASE_ANON_KEY,
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
})
