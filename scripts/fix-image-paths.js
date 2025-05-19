const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

async function fixImagePaths() {
  console.log('Fixing image paths in the codebase...');
  
  try {
    // Load the mapping
    const imageMappings = await fs.readJson('./src/utils/image-paths.json');
    
    if (!imageMappings || Object.keys(imageMappings).length === 0) {
      console.error('No image mappings found. Please run image-optimization.js first.');
      process.exit(1);
    }
    
    // Find all JS and JSX files
    const files = await glob.glob('./src/**/*.@(js|jsx)');
    
    console.log(`Found ${files.length} files to process`);
    
    // Process each file
    for (const filePath of files) {
      // Read the file content
      let content = await fs.readFile(filePath, 'utf8');
      let modified = false;
      
      // Replace all image paths
      for (const [originalPath, optimizedPath] of Object.entries(imageMappings)) {
        // Different patterns to match image paths
        const patterns = [
          new RegExp(`["']${originalPath}["']`, 'g'),
          new RegExp(`["'](${process.env.PUBLIC_URL})?${originalPath}["']`, 'g'),
          new RegExp(`["']\\.?\\/?images${originalPath.replace('/images', '')}["']`, 'g')
        ];
        
        patterns.forEach(pattern => {
          const newContent = content.replace(pattern, `"${optimizedPath}"`);
          if (newContent !== content) {
            content = newContent;
            modified = true;
          }
        });
      }
      
      // Save the file if it was modified
      if (modified) {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`Updated paths in: ${filePath}`);
      }
    }
    
    console.log('Image path fixes completed!');
  } catch (error) {
    console.error('Error fixing image paths:', error);
    process.exit(1);
  }
}

// Update OptimizedImage component to use WebP
async function updateOptimizedImageComponent() {
  console.log('Updating OptimizedImage component...');
  
  const componentPath = './src/components/OptimizedImage.jsx';
  
  try {
    if (await fs.pathExists(componentPath)) {
      let content = await fs.readFile(componentPath, 'utf8');
      
      // Add WebP handling
      if (!content.includes('type="image/webp"')) {
        const updatedContent = content.replace(
          /<img\s+/,
          `<picture>
            <source srcSet={props.src.endsWith('.webp') ? props.src : props.src.replace(/\\.(jpe?g|png)$/, '.webp')} type="image/webp" />
            <img `
        ).replace(
          /(\s*)(<\/?\s*img[^>]*>)/,
          '$1$2\n$1</picture>'
        );
        
        await fs.writeFile(componentPath, updatedContent, 'utf8');
        console.log('OptimizedImage component updated for WebP support');
      } else {
        console.log('OptimizedImage component already supports WebP');
      }
    } else {
      console.log('OptimizedImage component not found, creating it');
      
      // Create the component
      const componentContent = `import React, { useState } from 'react';

const OptimizedImage = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  const handleError = () => {
    setError(true);
    if (props.fallbackSrc) {
      console.warn(\`Failed to load image: \${props.src}, falling back to \${props.fallbackSrc}\`);
    } else {
      console.error(\`Failed to load image: \${props.src}\`);
    }
  };
  
  return (
    <picture>
      <source srcSet={props.src.endsWith('.webp') ? props.src : props.src.replace(/\\.(jpe?g|png)$/, '.webp')} type="image/webp" />
      <img
        {...props}
        loading={props.priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
        src={error && props.fallbackSrc ? props.fallbackSrc : props.src}
        alt={props.alt || ""}
        className={\`\${props.className || ""} \${!isLoaded ? "opacity-0" : "opacity-100 transition-opacity duration-300"}\`}
      />
    </picture>
  );
};

export default OptimizedImage;`;
      
      await fs.writeFile(componentPath, componentContent, 'utf8');
      console.log('Created OptimizedImage component with WebP support');
    }
  } catch (error) {
    console.error('Error updating OptimizedImage component:', error);
  }
}

// Main execution
(async () => {
  await updateOptimizedImageComponent();
  await fixImagePaths();
})(); 