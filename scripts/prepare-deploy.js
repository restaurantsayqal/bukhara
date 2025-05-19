/**
 * GitHub Pages Deployment Preparation Script
 * 
 * This script prepares the build folder for deployment to GitHub Pages:
 * 1. Creates a .nojekyll file to disable Jekyll processing
 * 2. Creates the proper directory structure for /bukhara/ path
 * 3. Copies necessary files to the correct locations
 */

const fs = require('fs-extra');
const path = require('path');

console.log('🔧 Preparing build for GitHub Pages deployment...');

// Path to the build directory
const buildDir = path.join(__dirname, '../build');

// Step 1: Create .nojekyll file
console.log('📝 Creating .nojekyll file...');
fs.writeFileSync(path.join(buildDir, '.nojekyll'), '');

// Step 2: Ensure bukhara subdirectories exist in the build folder
console.log('📁 Creating proper directory structure...');
const bukharaImagesDir = path.join(buildDir, 'bukhara', 'images');
const bukharaBackgroundDir = path.join(buildDir, 'bukhara', 'background');

fs.ensureDirSync(bukharaImagesDir);
fs.ensureDirSync(bukharaBackgroundDir);

// Step 3: Copy files to bukhara directory
console.log('📋 Copying files to correct locations...');

// Copy images
try {
  fs.copySync(
    path.join(buildDir, 'images'),
    path.join(buildDir, 'bukhara', 'images'),
    { overwrite: true }
  );
  console.log('✅ Images copied successfully');
} catch (err) {
  console.error('❌ Error copying images:', err);
}

// Copy background files
try {
  fs.copySync(
    path.join(buildDir, 'background'),
    path.join(buildDir, 'bukhara', 'background'),
    { overwrite: true }
  );
  console.log('✅ Background files copied successfully');
} catch (err) {
  console.error('❌ Error copying background files:', err);
}

console.log('🎉 Build preparation complete! Ready for GitHub Pages deployment.'); 