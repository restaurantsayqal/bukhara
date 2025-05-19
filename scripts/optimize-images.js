/**
 * Скрипт для оптимизации изображений
 * 
 * Для использования:
 * 1. Установите зависимости: npm install sharp glob fs-extra
 * 2. Запустите: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

const MAX_SIZE_KB = 250;
const QUALITY = 80;

// Directories to optimize
const directories = [
  'public/images',
  'public/background'
];

async function optimizeImages() {
  console.log('🔍 Finding images to optimize...');
  
  // Get all image files from specified directories
  const imagePatterns = directories.map(dir => `${dir}/**/*.{jpg,jpeg,png,webp}`);
  const imageFiles = [];
  
  for (const pattern of imagePatterns) {
    const files = glob.sync(pattern);
    imageFiles.push(...files);
  }
  
  console.log(`🖼️ Found ${imageFiles.length} images to process.`);
  
  // Process each image
  let optimizedCount = 0;
  let skippedCount = 0;
  
  for (const file of imageFiles) {
    const fileSizeInKB = fs.statSync(file).size / 1024;
    const ext = path.extname(file).toLowerCase();
    
    // Skip if file is already below target size
    if (fileSizeInKB <= MAX_SIZE_KB) {
      console.log(`✅ ${file} is already optimized (${Math.round(fileSizeInKB)}KB)`);
      skippedCount++;
      continue;
    }
    
    console.log(`⚙️ Optimizing ${file} (${Math.round(fileSizeInKB)}KB)...`);
    
    try {
      const image = sharp(file);
      const metadata = await image.metadata();
      
      // Determine output options based on file type
      let outputOptions = {};
      
      if (ext === '.jpg' || ext === '.jpeg') {
        outputOptions = { quality: QUALITY, mozjpeg: true };
      } else if (ext === '.png') {
        outputOptions = { 
          quality: QUALITY,
          compressionLevel: 9,
          palette: true
        };
      } else if (ext === '.webp') {
        outputOptions = { quality: QUALITY };
      }
      
      // Resize if needed (keeping aspect ratio)
      let resizeOptions = {};
      if (metadata.width > 1920) {
        resizeOptions = { 
          width: 1920,
          withoutEnlargement: true,
          fit: 'inside'
        };
      }
      
      // Create a temp file
      const tempPath = `${file}.optimized${ext}`;
      
      // Process the image with appropriate options
      if (ext === '.jpg' || ext === '.jpeg') {
        await image
          .resize(resizeOptions)
          .jpeg(outputOptions)
          .toFile(tempPath);
      } else if (ext === '.png') {
        await image
          .resize(resizeOptions)
          .png(outputOptions)
          .toFile(tempPath);
      } else if (ext === '.webp') {
        await image
          .resize(resizeOptions)
          .webp(outputOptions)
          .toFile(tempPath);
      }
      
      // Check if optimized image is smaller
      const newSizeInKB = fs.statSync(tempPath).size / 1024;
      
      if (newSizeInKB < fileSizeInKB) {
        // Replace the original with the optimized version
        fs.unlinkSync(file);
        fs.renameSync(tempPath, file);
        console.log(`✅ ${file} optimized from ${Math.round(fileSizeInKB)}KB to ${Math.round(newSizeInKB)}KB`);
        optimizedCount++;
      } else {
        // Keep the original if optimization didn't help
        fs.unlinkSync(tempPath);
        console.log(`ℹ️ ${file} not optimized (already optimal)`);
        skippedCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
      // Clean up temp file if it exists
      const tempPath = `${file}.optimized${ext}`;
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  }
  
  console.log('\n📊 Optimization Summary:');
  console.log(`✅ Optimized: ${optimizedCount} images`);
  console.log(`⏩ Skipped: ${skippedCount} images`);
  console.log(`🎉 All done!`);
}

// Run the optimization
optimizeImages().catch(err => {
  console.error('❌ Error during optimization:', err);
  process.exit(1);
}); 