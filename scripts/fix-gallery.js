/**
 * Gallery Fix Script
 * 
 * This script addresses common issues with the image gallery in the About page:
 * 1. Ensures all image paths are using process.env.PUBLIC_URL
 * 2. Adds proper lazy loading and error handling
 * 3. Fixes mobile responsive issues
 * 4. Improves swipe gestures and touch support
 */

const fs = require('fs');
const path = require('path');

// Path to the about.jsx file
const aboutFilePath = path.join(__dirname, '../src/pages/about.jsx');

console.log('Starting gallery fix...');

// Read the file
try {
  let content = fs.readFileSync(aboutFilePath, 'utf8');
  
  // Fix 1: Ensure all image paths use process.env.PUBLIC_URL
  content = content.replace(
    /['"]\/bukhara\/images\/([^'"]+)['"]/g, 
    '`${process.env.PUBLIC_URL}/images/$1`'
  );
  
  content = content.replace(
    /['"]\/bukhara\/background\/([^'"]+)['"]/g, 
    '`${process.env.PUBLIC_URL}/background/$1`'
  );
  
  // Fix 2: Add proper loading and error handling attributes to images
  content = content.replace(
    /<img([^>]+)>/g,
    (match, attributes) => {
      if (!attributes.includes('loading=')) {
        attributes += ' loading="lazy"';
      }
      if (!attributes.includes('onError=')) {
        attributes += ' onError={(e) => { e.target.onerror = null; e.target.src = `${process.env.PUBLIC_URL}/images/background/uzbek-pattern.jpg`; }}';
      }
      return `<img${attributes}>`;
    }
  );
  
  // Fix 3: Only add the mobile optimization if it doesn't already exist
  const hasGalleryOptimization = content.includes('useGalleryMobileOptimization');
  
  if (!hasGalleryOptimization) {
    // Mobile optimization for gallery
    const mobileGalleryStyles = `
  // Mobile optimization for gallery
  const useGalleryMobileOptimization = () => {
    useEffect(() => {
      const handleResize = () => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          document.querySelectorAll('.gallery-image').forEach(img => {
            img.style.height = '220px';
            img.style.width = '100%';
            img.style.objectFit = 'cover';
          });
          
          // Improve touch targets
          document.querySelectorAll('.gallery-nav-button').forEach(btn => {
            btn.style.width = '44px';
            btn.style.height = '44px';
          });

          // Ensure no horizontal overflow
          document.querySelectorAll('.overflow-hidden').forEach(el => {
            el.style.maxWidth = '100%';
          });
        } else {
          // Reset for desktop
          document.querySelectorAll('.gallery-image').forEach(img => {
            img.style.height = '';
            img.style.width = '';
            img.style.objectFit = '';
          });
          document.querySelectorAll('.gallery-nav-button').forEach(btn => {
            btn.style.width = '';
            btn.style.height = '';
          });
          document.querySelectorAll('.overflow-hidden').forEach(el => {
            el.style.maxWidth = '';
          });
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  };
  `;
    
    // Add the mobile optimization function
    content = content.replace(
      /const About = \(\) => {/,
      `const About = () => {\n  ${mobileGalleryStyles}`
    );
    
    // Only add the function call if it doesn't already exist
    if (!content.includes('useGalleryMobileOptimization();')) {
      content = content.replace(
        /\s+useEffect\(\(\) => {/,
        `\n  // Use mobile optimizations\n  useGalleryMobileOptimization();\n\n  useEffect(() => {`
      );
    }
  }
  
  // Fix: Make sure to escape any problematic quotes in text
  content = content.replace(
    /Bizning vazifamiz - har bir mehmon nafaqat ajoyib taomlardan bahramand bo\\?'lishi, balki o\\?'zbek mehmondo\\?'stligi va madaniyati muhitiga sho\\?[\'"]ng[\'"]ishi mumkin bo\\?'lgan joy yaratishdir./g,
    "Bizning vazifamiz - har bir mehmon nafaqat ajoyib taomlardan bahramand bo\\'lishi, balki o\\'zbek mehmondo\\'stligi va madaniyati muhitiga sho\\\\'ng\\\\'ishi mumkin bo\\'lgan joy yaratishdir."
  );
  
  // Write the updated content back to the file
  fs.writeFileSync(aboutFilePath, content, 'utf8');
  console.log('✅ Gallery fixes successfully applied!');
  
} catch (error) {
  console.error('❌ Error fixing gallery:', error);
} 