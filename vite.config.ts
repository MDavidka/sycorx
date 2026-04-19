import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Using default esbuild minifier as per requirements
  },
  server: {
    port: 3000,
    open: true,
  },
});