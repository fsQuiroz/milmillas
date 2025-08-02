import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-mui': ['@mui/material', '@mui/icons-material', '@mui/system', '@emotion/react', '@emotion/styled'],
          'vendor-forms': ['formik', 'yup'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
