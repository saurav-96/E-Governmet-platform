import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }) => ({
  // GitHub Pages serves the site from /government-dashboard/, so production
  // builds need that base path. Local dev keeps using the root.
  base: command === 'build' ? '/government-dashboard/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
