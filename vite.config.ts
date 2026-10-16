import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // O preview do Arena expõe o dev server em https://{port}-{sandbox}.e2b.app
    allowedHosts: ['.e2b.app'],
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ['.e2b.app'],
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        // GSAP/Lenis em chunk próprio: mudam pouco e são cacheáveis.
        // (No build de SSR — usado só pela auditoria — tudo é external.)
        manualChunks: isSsrBuild
          ? undefined
          : {
              motion: ['gsap', 'gsap/ScrollTrigger', '@gsap/react', 'lenis'],
            },
      },
    },
  },
}));
