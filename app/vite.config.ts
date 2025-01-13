import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';  // Sử dụng node:path thay vì path

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});