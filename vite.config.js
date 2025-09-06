import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  root: 'src',
  plugins: [
    ViteImageOptimizer({
      /* pass your config here */
      // Example: optimize JPGs to 80% quality
      jpg: {
        quality: 80,
      },
      png: {
        quality: 80,
      },
    }),
  ],
});