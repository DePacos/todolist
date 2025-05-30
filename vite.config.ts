import react from '@vitejs/plugin-react';

import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  base: '/',
  server: {
    port: 3000,
  },
});
