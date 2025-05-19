const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

async function optimizeImages() {
  console.log('Starting image optimization...');
  
  try {
    // Create the directory for optimized images if it doesn't exist
    await fs.ensureDir(path.join(process.cwd(), 'public', 'optimized'));
    
    // Find all image files
    const imageFiles = await glob.glob('./public/**/*.@(jpg|jpeg|png)', {
      ignore: ['./public/optimized/**/*']
    });
    
    console.log(`Found ${imageFiles.length} images to optimize`);
    
    // Track successful and failed optimizations
    const optimized = [];
    const failed = [];
    
    // Process each image
    for (const filePath of imageFiles) {
      try {
        const baseName = path.basename(filePath, path.extname(filePath));
        const dirName = path.dirname(filePath);
        const optimizedPath = path.join(
          dirName.replace('public', 'public/optimized'),
          `${baseName}.webp`
        );
        
        // Ensure the output directory exists
        await fs.ensureDir(path.dirname(optimizedPath));
        
        // Optimize and convert the image
        await sharp(filePath)
          .webp({ quality: 75 })
          .toFile(optimizedPath);
        
        console.log(`Optimized: ${filePath} -> ${optimizedPath}`);
        optimized.push({ original: filePath, optimized: optimizedPath });
      } catch (error) {
        console.error(`Failed to optimize image ${filePath}: ${error.message}`);
        failed.push({ path: filePath, error: error.message });
      }
    }
    
    console.log(`\nOptimization complete. ${optimized.length} images optimized, ${failed.length} failed.`);
    
    if (failed.length > 0) {
      console.log('\nFailed images:');
      failed.forEach(fail => console.log(`- ${fail.path}: ${fail.error}`));
    }
    
    // If all images failed, don't proceed
    if (optimized.length === 0) {
      console.error('No images were successfully optimized.');
      return false;
    }
    
    // Create mapping only for successful optimizations
    const mapping = {};
    optimized.forEach(item => {
      const relativePath = item.original.replace('./public/', '/');
      const optimizedRelativePath = item.optimized.replace('./public', '');
      mapping[relativePath] = optimizedRelativePath;
    });
    
    // Create utils directory if it doesn't exist
    await fs.ensureDir('./src/utils');
    
    // Save the mapping
    await fs.writeJson('./src/utils/image-paths.json', mapping, { spaces: 2 });
    console.log('Image path mapping created at ./src/utils/image-paths.json');
    
    return true;
  } catch (error) {
    console.error('Error optimizing images:', error);
    return false;
  }
}

// Create a mapping file for original paths to new optimized paths
async function createPathMapping() {
  console.log('Creating image path mappings...');
  
  try {
    // Check if the optimized directory exists
    if (!await fs.pathExists('./public/optimized')) {
      console.error('Optimized images directory not found. Skipping path mapping.');
      return false;
    }
    
    const originalImages = await glob.glob('./public/**/*.@(jpg|jpeg|png)', {
      ignore: ['./public/optimized/**/*']
    });
    
    const optimizedImages = await glob.glob('./public/optimized/**/*.webp');
    
    if (optimizedImages.length === 0) {
      console.error('No optimized images found. Skipping path mapping.');
      return false;
    }
    
    const mapping = {};
    
    originalImages.forEach(originalPath => {
      const relativePath = originalPath.replace('./public/', '/');
      const baseName = path.basename(originalPath, path.extname(originalPath));
      
      // Find the corresponding optimized image
      const optimizedImage = optimizedImages.find(img => 
        path.basename(img, '.webp') === baseName
      );
      
      if (optimizedImage) {
        const optimizedRelativePath = optimizedImage.replace('./public', '');
        mapping[relativePath] = optimizedRelativePath;
      }
    });
    
    // Create utils directory if it doesn't exist
    await fs.ensureDir('./src/utils');
    
    // Save the mapping
    await fs.writeJson('./src/utils/image-paths.json', mapping, { spaces: 2 });
    console.log('Image path mapping created at ./src/utils/image-paths.json');
    
    return Object.keys(mapping).length > 0;
  } catch (error) {
    console.error('Error creating path mappings:', error);
    return false;
  }
}

// Main execution
(async () => {
  const optimizationSuccess = await optimizeImages();
  if (!optimizationSuccess) {
    console.log('Image optimization had issues. Creating path mapping from any successful optimizations...');
  }
  
  const mappingSuccess = await createPathMapping();
  if (!mappingSuccess) {
    console.error('Failed to create image path mappings. Please check the logs above.');
    process.exit(1);
  }
})(); 