const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

async function enhancePerformance() {
  console.log('Enhancing website performance...');
  
  try {
    // Add utils directory if it doesn't exist
    await fs.ensureDir('./src/utils');
    
    // Create a component preloading utility
    const imagePreloaderPath = './src/utils/imagePreloader.js';
    if (!await fs.pathExists(imagePreloaderPath)) {
      const preloaderContent = `// Image Preloader Utility
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

export const preloadImages = (images) => {
  return Promise.all(images.map(src => preloadImage(src)));
};

// Preload critical images
export const preloadCriticalImages = async () => {
  const criticalImages = [
    '/images/background/herosection.webp',
    '/images/logo.webp'
    // Add other critical images here
  ];
  
  try {
    await preloadImages(criticalImages);
    console.log('Critical images preloaded');
  } catch (error) {
    console.warn('Failed to preload some images', error);
  }
};

// Throttle function to limit execution frequency
export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
`;
      await fs.writeFile(imagePreloaderPath, preloaderContent, 'utf8');
      console.log('Created image preloader utility');
    }
    
    // Create smooth scroll utility
    const smoothScrollPath = './src/utils/smoothScroll.js';
    if (!await fs.pathExists(smoothScrollPath)) {
      const smoothScrollContent = `// Smooth Scroll Utility
export const smoothScrollTo = (elementId, offset = 0, duration = 800) => {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) return;
  
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;
  
  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    
    window.scrollTo(0, startPosition + distance * ease);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };
  
  const easeInOutCubic = (t) => {
    return t < 0.5 
      ? 4 * t * t * t 
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  
  requestAnimationFrame(animation);
};

// Hook up smooth scrolling to all links with hash
export const initSmoothScroll = (offset = 80) => {
  document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Skip if it's just "#" or has no ID
        if (href === '#' || href.length <= 1) return;
        
        e.preventDefault();
        const targetId = href.substring(1); // Remove the # character
        smoothScrollTo(targetId, offset);
      });
    });
  });
};
`;
      await fs.writeFile(smoothScrollPath, smoothScrollContent, 'utf8');
      console.log('Created smooth scroll utility');
    }
    
    // Update index.js to use the performance utilities
    const indexPath = './src/index.js';
    if (await fs.pathExists(indexPath)) {
      let content = await fs.readFile(indexPath, 'utf8');
      
      // Add import for preloadCriticalImages if not present
      if (!content.includes('preloadCriticalImages')) {
        const importStatement = `import { preloadCriticalImages } from './utils/imagePreloader';\n`;
        content = content.replace(
          /import [^;]*;/,
          (match) => `${match}\n${importStatement}`
        );
      }
      
      // Add import for smooth scroll if not present
      if (!content.includes('initSmoothScroll')) {
        const importStatement = `import { initSmoothScroll } from './utils/smoothScroll';\n`;
        content = content.replace(
          /import [^;]*;/,
          (match) => `${match}\n${importStatement}`
        );
      }
      
      // Add code to call preloadCriticalImages
      if (!content.includes('preloadCriticalImages()')) {
        content = content.replace(
          /ReactDOM\.render\(/,
          `// Preload critical images
preloadCriticalImages();

// Initialize smooth scrolling
initSmoothScroll(80);

ReactDOM.render(`
        );
      }
      
      await fs.writeFile(indexPath, content, 'utf8');
      console.log('Updated index.js with performance optimizations');
    }
    
    // Update components to use lazy loading
    const componentFiles = await glob.glob('./src/components/**/*.jsx');
    let updatedComponents = 0;
    
    for (const filePath of componentFiles) {
      let content = await fs.readFile(filePath, 'utf8');
      let modified = false;
      
      // Add lazy loading to images if not already present
      if (content.includes('<img') && !content.includes('loading=')) {
        content = content.replace(
          /<img\s+([^>]*)/g,
          '<img loading="lazy" $1'
        );
        modified = true;
      }
      
      // Add throttled event handlers if needed
      if ((content.includes('onScroll') || content.includes('addEventListener(\'scroll\'')) && 
          !content.includes('throttle')) {
        
        // Add throttle import if not present
        if (!content.includes('import { throttle }')) {
          content = content.replace(
            /import [^;]*;/,
            (match) => `${match}\nimport { throttle } from '../utils/imagePreloader';`
          );
        }
        
        // Wrap scroll handlers with throttle
        content = content.replace(
          /(\w+)\s*=\s*\(\)\s*=>\s*{[^}]*scrollY[^}]*}/g,
          (match, funcName) => {
            if (match.includes('throttle(')) return match;
            return `${funcName} = throttle(() => ${match.substring(match.indexOf('{')).trim()}, 100)`;
          }
        );
        
        modified = true;
      }
      
      if (modified) {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`Added performance optimizations to: ${filePath}`);
        updatedComponents++;
      }
    }
    
    console.log(`Updated ${updatedComponents} components with performance optimizations`);
    console.log('Performance enhancement completed!');
  } catch (error) {
    console.error('Error enhancing performance:', error);
    process.exit(1);
  }
}

// Main execution
enhancePerformance(); 