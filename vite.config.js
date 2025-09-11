import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist'
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true
  },
  plugins: [
    ViteImageOptimizer(),
  ],
});