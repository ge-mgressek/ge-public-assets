import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist'
  },
  plugins: [
    ViteImageOptimizer(),
    // Plugin to copy functions and routes to dist
    {
      name: 'copy-cloudflare-files',
      writeBundle() {
        const fs = require('fs');
        const path = require('path');
        
        // Copy functions folder
        if (fs.existsSync('functions')) {
          fs.cpSync('functions', 'dist/functions', { recursive: true });
          console.log('✅ Copied functions/ to dist/functions/');
        }
        
        // Copy _routes.json
        if (fs.existsSync('_routes.json')) {
          fs.copyFileSync('_routes.json', 'dist/_routes.json');
          console.log('✅ Copied _routes.json to dist/_routes.json');
        }
      }
    }
  ],
});