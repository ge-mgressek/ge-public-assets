import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Image optimization configurations based on PageSpeed insights
const optimizations = [
  {
    input: 'src/assets/images/WP-Philippine_Eagle.jpg',
    output: 'src/assets/images/WP-Philippine_Eagle.webp',
    width: 280,
    height: 420,
    quality: 85
  },
  {
    input: 'src/assets/images/GE-CPU.png',
    output: 'src/assets/images/GE-CPU.webp',
    width: 120,
    height: 116,
    quality: 85
  },
  {
    input: 'src/assets/images/WP-Tarsier-GG.jpg',
    output: 'src/assets/images/WP-Tarsier-GG.webp',
    width: 280,
    height: 420,
    quality: 85
  },
  {
    input: 'src/assets/images/GE-CoconutCarbonCycle.png',
    output: 'src/assets/images/GE-CoconutCarbonCycle.webp',
    width: 380,
    height: 588,
    quality: 85
  },
  {
    input: 'src/assets/images/GE-NetZeroFire.png',
    output: 'src/assets/images/GE-NetZeroFire.webp',
    width: null, // Keep original dimensions, just compress
    height: null,
    quality: 85
  },
  {
    input: 'src/assets/images/CoconutTree.png',
    output: 'src/assets/images/CoconutTree.webp',
    width: 200,
    height: 305,
    quality: 85
  },
  {
    input: 'src/assets/images/GE-CropX.png',
    output: 'src/assets/images/GE-CropX.webp',
    width: 48,
    height: 48,
    quality: 85
  },
  {
    input: 'src/assets/images/GE-PalmFrond.png',
    output: 'src/assets/images/GE-PalmFrond.webp',
    width: 150,
    height: 172,
    quality: 85
  }
];

async function optimizeImages() {
  console.log('Starting image optimization...');
  
  for (const config of optimizations) {
    try {
      const { input, output, width, height, quality } = config;
      
      if (!fs.existsSync(input)) {
        console.log(`Skipping ${input} - file not found`);
        continue;
      }

      let pipeline = sharp(input);
      
      // Resize if dimensions specified
      if (width && height) {
        pipeline = pipeline.resize(width, height, {
          fit: 'cover',
          position: 'center'
        });
      }
      
      // Convert to WebP with quality
      pipeline = pipeline.webp({ quality });
      
      // Save the optimized image
      await pipeline.toFile(output);
      
      // Check file sizes
      const originalSize = fs.statSync(input).size;
      const optimizedSize = fs.statSync(output).size;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      
      console.log(`✓ ${path.basename(input)} → ${path.basename(output)}`);
      console.log(`  Original: ${(originalSize / 1024).toFixed(1)}KB → Optimized: ${(optimizedSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
      
    } catch (error) {
      console.error(`✗ Error optimizing ${config.input}:`, error.message);
    }
  }
  
  console.log('\nImage optimization complete!');
}

optimizeImages().catch(console.error);