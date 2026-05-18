import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'vendor_react';
          if (id.includes('node_modules/@supabase/')) return 'vendor_supabase';
          if (id.includes('node_modules/@xyflow/')) return 'vendor_xyflow';
        },
      },
    },
  },
})
