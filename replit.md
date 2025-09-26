# Globe-Eco Public Assets Website

## Overview
This is a static website for Globe-Eco, showcasing their carbon capture technology using coconut waste. The site presents their breakthrough in converting coconut plantation waste into carbon-negative building materials.

## Recent Changes
- **2025-09-26**: Fixed critical JavaScript import issue and layout shifting problems
  - Resolved import.meta.glob dynamic import compatibility issue with production builds
  - Replaced dynamic glob import with individual static imports for all 17 SDG images
  - Verified all UN Sustainable Development Goal tiles now display correctly
  - **MAJOR FIX**: Eliminated layout shifting by disabling problematic fade-in animations
  - All sections now remain visible throughout scroll for stable, consistent layout
  - **BIODIVERSITY SECTION FIX**: Added consistent h-64 height to eagle and tarsier images to prevent layout shifting during slideshow transitions
  - Fixed Matthew Grecsek portrait positioning in "Our Story" section using CSS object-position (60% 30%)
  - Preserved lazy loading functionality and mobile performance optimizations
  - Layout stability and content visibility fully restored
- **2025-09-11**: Successfully imported and configured for Replit environment
  - Updated Vite configuration for 0.0.0.0:5000 hosting
  - Removed HMR clientPort to prevent proxy connection issues
  - Configured deployment for autoscale with build process
  - Added serve package for production static file serving

## Project Architecture
- **Frontend Framework**: Vite (static site generator)
- **Styling**: TailwindCSS (via CDN), custom CSS
- **JavaScript**: Vanilla JS with interactive animations
- **Assets**: Images, videos, optimized with vite-plugin-image-optimizer
- **Charts**: Chart.js for data visualization
- **Build Output**: Static files in `dist/` directory
- **Deployment**: Autoscale deployment target with npm run build

## Key Features
- Interactive CO2 animation on hero section
- SDG (Sustainable Development Goals) interactive grid
- Data visualizations for impact metrics
- Responsive design with mobile navigation
- Video backgrounds and optimized media

## Structure
- `/src` - Source files (HTML, CSS, JS, assets)
- `/functions` - Cloudflare Functions middleware (analytics)
- `/dist` - Build output (generated)
- `vite.config.js` - Vite configuration for dev and build
- `_routes.json` - Routing configuration for Cloudflare Pages

## Development
- Port: 5000
- Host: 0.0.0.0 (required for Replit)
- CSS Compilation: Production build approach for stable Tailwind processing
- Workflow: "Frontend Server" running `npm run build && npx serve -s dist`
- Note: Development server had Tailwind CSS compilation issues, resolved by using production builds