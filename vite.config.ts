import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }) => ({
  // GitHub Pages serves the site from /E-Governmet-platform/, so production
  // builds need that base path. Local dev keeps using the root.
  base: command === 'build' ? '/E-Governmet-platform/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
