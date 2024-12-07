import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist', // Produktions-Build-Ziel
    emptyOutDir: true,
  },
  server: {
    port: 3000, // Entwicklungsserver-Port
    open: true, // Browser automatisch öffnen
  },
});
