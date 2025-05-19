const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

async function optimizeMobile() {
  console.log('Optimizing website for mobile devices...');
  
  try {
    // 1. Update viewport meta tag in index.html
    const indexPath = './public/index.html';
    if (await fs.pathExists(indexPath)) {
      let content = await fs.readFile(indexPath, 'utf8');
      
      // Check if viewport meta tag needs updating
      if (!content.includes('viewport')) {
        content = content.replace(
          /<head>/, 
          `<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">`
        );
      } else if (!content.includes('maximum-scale')) {
        content = content.replace(
          /<meta name="viewport"[^>]*>/,
          `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">`
        );
      }
      
      // Add touch-action optimization
      if (!content.includes('touch-action')) {
        content = content.replace(
          /<style>/, 
          `<style>
      html, body { touch-action: manipulation; -webkit-overflow-scrolling: touch; }`
        );
      }
      
      await fs.writeFile(indexPath, content, 'utf8');
      console.log('Updated viewport meta tag in index.html');
    }
    
    // 2. Create or update global CSS with mobile optimizations
    const globalCssPath = './src/index.css';
    if (await fs.pathExists(globalCssPath)) {
      let cssContent = await fs.readFile(globalCssPath, 'utf8');
      
      // Add mobile optimizations if they don't exist
      if (!cssContent.includes('@media (max-width: 768px)')) {
        cssContent += `
/* Mobile Optimizations */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  
  /* Fix overflow issues */
  body, html {
    overflow-x: hidden;
    width: 100%;
    position: relative;
  }
  
  /* Reduce padding/margins on mobile */
  .py-16 {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }
  
  .px-8 {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  
  .my-12 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
  
  /* Adjust text sizes */
  h1, .text-4xl, .text-5xl {
    font-size: 2rem !important;
  }
  
  h2, .text-3xl, .text-4xl {
    font-size: 1.75rem !important;
  }
  
  /* Improve tap targets */
  button, a, [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Add iOS specific optimizations */
@supports (-webkit-touch-callout: none) {
  /* iOS specific styles */
  .ios-fix {
    /* Add padding to avoid content hidden by notch/home indicator */
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
}
`;
      }
      
      await fs.writeFile(globalCssPath, cssContent, 'utf8');
      console.log('Updated global CSS with mobile optimizations');
    }
    
    // 3. Fix any layout issues in main components
    const componentFiles = await glob.glob('./src/components/**/*.jsx');
    let fixedComponents = 0;
    
    for (const filePath of componentFiles) {
      let content = await fs.readFile(filePath, 'utf8');
      let modified = false;
      
      // Fix navbar for mobile
      if (path.basename(filePath) === 'Navbar.jsx') {
        if (!content.includes('md:flex-row')) {
          content = content.replace(
            /className="flex (flex-row|flex-col)[^"]*"/g,
            'className="flex flex-col md:flex-row$1"'
          );
          modified = true;
        }
      }
      
      // Fix other common responsive layout issues
      if (!content.includes('sm:') && !content.includes('md:')) {
        content = content.replace(
          /className="([^"]*)grid-cols-3([^"]*)"/g,
          'className="$1grid-cols-1 sm:grid-cols-2 md:grid-cols-3$2"'
        );
        
        content = content.replace(
          /className="([^"]*)grid-cols-2([^"]*)"/g,
          'className="$1grid-cols-1 sm:grid-cols-2$2"'
        );
        
        content = content.replace(
          /className="([^"]*)flex-row([^"]*)"/g,
          'className="$1flex-col sm:flex-row$2"'
        );
        
        modified = true;
      }
      
      if (modified) {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`Updated mobile layout in: ${filePath}`);
        fixedComponents++;
      }
    }
    
    console.log(`Fixed mobile layout issues in ${fixedComponents} components`);
    console.log('Mobile optimization completed!');
  } catch (error) {
    console.error('Error optimizing for mobile:', error);
    process.exit(1);
  }
}

// Main execution
optimizeMobile(); 