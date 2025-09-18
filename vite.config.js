import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  build: {
    // This is true by default when outDir is inside root, but it's fine to be explicit.
    emptyOutDir: true 
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true
  },
  plugins: [
    ViteImageOptimizer({
      // Comprehensive image optimization for assets folder
      include: /\.(jpe?g|png|gif|tiff|bmp|svg)$/i,
      gifsicle: { 
        optimizationLevel: 7, 
        interlaced: false 
      },
      mozjpeg: { 
        quality: 85,
        progressive: true 
      },
      pngquant: { 
        quality: [0.8, 0.9], 
        speed: 4 
      },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false }
        ]
      },
    }),
  ],
});