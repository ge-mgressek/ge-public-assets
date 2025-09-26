import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { imagetools } from 'vite-imagetools';

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
    // Responsive image generation for imports
    imagetools({
      defaultDirectives: (url) => {
        // Define responsive presets based on query params
        if (url.searchParams.has('preset')) {
          const preset = url.searchParams.get('preset');
          
          switch (preset) {
            case 'hero':
              return new URLSearchParams({
                format: 'avif;webp;jpg',
                quality: '85',
                w: '480;768;1024;1200;1600;1920',
                as: 'picture'
              });
            case 'content':
              return new URLSearchParams({
                format: 'avif;webp;jpg', 
                quality: '95',
                w: '320;640;960;1280',
                as: 'picture'
              });
            case 'thumbnail':
              return new URLSearchParams({
                format: 'avif;webp;jpg',
                quality: '85', 
                w: '80;160;320',
                as: 'picture'
              });
          }
        }
        return url.searchParams;
      }
    }),
    ViteImageOptimizer({
      // Comprehensive image optimization for assets folder  
      include: /\.(jpe?g|png|gif|tiff|bmp|svg)$/i,
      gifsicle: { 
        optimizationLevel: 7, 
        interlaced: false 
      },
      mozjpeg: { 
        quality: 95,
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