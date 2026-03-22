import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split heavy vendor libraries into separate cacheable chunks.
        // These load in parallel with the app code and are only re-downloaded
        // when the specific library version changes (not on every app deploy).
        manualChunks: {
          // React core — rarely changes, longest cache lifetime
          'vendor-react':    ['react', 'react-dom', 'react-router-dom'],
          // Leaflet — large (~200 KB), only needed on map pages
          'vendor-leaflet':  ['leaflet', 'react-leaflet', '@react-leaflet/core'],
          // Supabase client — separate chunk for auth/DB calls
          'vendor-supabase': ['@supabase/supabase-js'],
        },
      },
    },
  },
})
