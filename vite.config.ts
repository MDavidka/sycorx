import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    target: 'esnext'
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  preview: {
    port: 8080,
    host: true
  }
});