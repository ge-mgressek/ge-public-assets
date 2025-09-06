import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist' // <-- Add this build object
  },
  plugins: [
    ViteImageOptimizer(),
  ],
});