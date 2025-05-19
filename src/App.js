import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import ImagePreloader from './components/ImagePreloader';
import './App.css';

// Use React.lazy for code splitting
const Home = lazy(() => import('./pages/index'));
const About = lazy(() => import('./pages/about'));

// Simple loading spinner
const LoadingSpinner = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-sayqal-cream">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-sayqal-gold border-t-transparent"></div>
  </div>
);

// Category mappings supporting both Russian and Uzbek languages
const categoryMappings = {
  // Original ID categories mapped to all possible variations
  'salads': ['salads', 'salatlar', 'салаты'],
  'soups': ['soups', 'birinchi-taomlar', 'birinchitaomlar', 'первые-блюда', 'первыеблюда', 'первые блюда'],
  'mainDishes': ['mainDishes', 'maindishes', 'ikkinchi-taomlar', 'ikkinchitaomlar', 'вторые-блюда', 'вторыеблюда', 'вторые блюда'],
  'kebabs': ['kebabs', 'shashliklar', 'шашлыки'],
  'lunchboxes': ['lunchboxes', 'lanchboks', 'ланчбокс'],
  'sets': ['sets', 'setlar', 'сеты'],
  'breads': ['breads', 'nonlar', 'хлеб'],
  'desserts': ['desserts', 'shirinliklar', 'десерты'],
  'sauces': ['sauces', 'souslar', 'соусы'],
};

// Reversed mapping from display names to canonical IDs
const displayNameToId = {
  // Uzbek
  'salatlar': 'salads',
  'birinchi taomlar': 'soups',
  'ikkinchi taomlar': 'mainDishes',
  'shashliklar': 'kebabs',
  'lanchboks': 'lunchboxes',
  'setlar': 'sets',
  'nonlar': 'breads',
  'shirinliklar': 'desserts',
  'souslar': 'sauces',
  // Russian
  'салаты': 'salads',
  'первые блюда': 'soups',
  'вторые блюда': 'mainDishes',
  'шашлыки': 'kebabs',
  'ланчбокс': 'lunchboxes',
  'сеты': 'sets',
  'хлеб': 'breads',
  'десерты': 'desserts',
  'соусы': 'sauces',
};

// Get canonical ID from any possible variation
const getCategoryId = (possibleId) => {
  // First check if it's a direct display name match
  const normalizedId = possibleId.toLowerCase().replace(/-/g, ' ');
  
  if (displayNameToId[normalizedId]) {
    console.log('Found ID via display name mapping:', normalizedId, '->', displayNameToId[normalizedId]);
    return displayNameToId[normalizedId];
  }
  
  // Then check through all category mappings
  for (const [canonicalId, aliases] of Object.entries(categoryMappings)) {
    if (aliases.includes(possibleId.toLowerCase()) || 
        aliases.includes(possibleId.toLowerCase().replace(/ /g, '-')) ||
        aliases.includes(possibleId.toLowerCase().replace(/-/g, ' '))) {
      console.log('Found ID via alias mapping:', possibleId, '->', canonicalId);
      return canonicalId;
    }
  }
  
  console.log('No mapping found for ID:', possibleId, 'using as is');
  return possibleId; // If not found, return the original ID
};

// Helper function to scroll to element by id
const scrollToHashElement = (hash) => {
  if (!hash) return;
  
  let id = hash.substring(1); // Remove '#'
  
  // Try to get canonical ID if the hash is a translated name
  const canonicalId = getCategoryId(id);
  console.log('Navigation request to:', id, '-> Canonical ID:', canonicalId);
  
  // If found a canonical ID, use it
  if (canonicalId !== id) {
    console.log('Using canonical ID for navigation');
    id = canonicalId;
  }
  
  // Create an array of selectors to try
  const findElement = () => {
    const selectors = [
      `#${id}`, // Direct ID
      `[data-category-id="${id}"]`, // Data attribute
      `.menu-category#${id}`, // Class with ID
      `#title-${id}`, // Title element
      `[data-category="${id}"]`, // Data category attribute
      `.category-title h2[data-category="${id}"]` // Category title header
    ];
    
    // Try each selector
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        console.log('Found element using selector:', selector);
        return element;
      }
    }
    
    console.log('Failed to find element with any selector for ID:', id);
    return null;
  };
  
  const element = findElement();
  
  if (!element) {
    // Retry with increasing delays if element isn't found immediately
    let attempts = 0;
    const maxAttempts = 20; // Increased max attempts
    
    const checkElement = () => {
      attempts++;
      const el = findElement();
      
      if (el) {
        // Adjust scroll position based on device
        const isMobile = window.innerWidth < 768;
        const rect = el.getBoundingClientRect();
        const offsetTop = rect.top + window.pageYOffset;
        const offset = isMobile ? -80 : -100; // Increased offset to ensure visibility
        
        // Smooth scroll
        window.scrollTo({
          top: offsetTop + offset,
          behavior: 'smooth'
        });
        
        // Add highlight animation
        el.style.animation = 'pulse 2s';
        
        // Add temporary highlight class for better visibility
        el.classList.add('menu-highlight');
        
        // Remove highlights after animation
        setTimeout(() => {
          el.style.animation = '';
          el.classList.remove('menu-highlight');
        }, 2000);
        
        console.log('Successfully scrolled to element after', attempts, 'attempts');
      } else if (attempts < maxAttempts) {
        // Increasing delay with each attempt
        setTimeout(checkElement, 250 * Math.min(attempts, 4)); 
      } else {
        console.log("Failed to find element after multiple attempts, ID:", id);
        // Last resort - try to scroll to the menu section
        const menuSection = document.querySelector('.menu-section');
        if (menuSection) {
          menuSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    setTimeout(checkElement, 400);
  } else {
    // Element exists, scroll to it
    const isMobile = window.innerWidth < 768;
    const rect = element.getBoundingClientRect();
    const offsetTop = rect.top + window.pageYOffset;
    const offset = isMobile ? -80 : -100; // Increased offset
    
    // Smooth scroll
    window.scrollTo({
      top: offsetTop + offset,
      behavior: 'smooth'
    });
    
    // Add highlight animation
    element.style.animation = 'pulse 2s';
    
    // Add temporary highlight class
    element.classList.add('menu-highlight');
    
    // Remove highlights after animation
    setTimeout(() => {
      element.style.animation = '';
      element.classList.remove('menu-highlight');
    }, 2000);
    
    console.log('Immediately scrolled to found element');
  }
};

function App() {
  const location = useLocation();
  
  // Scroll to element after route changes
  useEffect(() => {
    // Use a longer timeout to ensure page has fully loaded
    const timer = setTimeout(() => {
      // Check if there's a hash in the URL
      if (location.hash) {
        scrollToHashElement(location.hash);
      } else {
        // Smooth scroll to top with improved performance
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    }, 500); // Increased delay for full page load
    
    return () => clearTimeout(timer); // Clean up timer
  }, [location.pathname, location.hash]); // Track both path and hash changes
  
  // Initial load hash handling
  useEffect(() => {
    if (location.hash) {
      // Use longer delay for initial load
      setTimeout(() => {
        scrollToHashElement(location.hash);
      }, 800); // Longer initial delay
    }
  }, [location.hash]);

  // Fix for scroll lag
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
      }
      
      /* Animation for menu highlighting */
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.5); }
        70% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
        100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
      }
      
      .menu-highlight {
        position: relative;
        z-index: 5;
        outline: 2px solid #D4AF37;
        outline-offset: 4px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <LanguageProvider>
      <ImagePreloader />
      <Suspense fallback={<div className="loading-container"><div className="loading-spinner"></div></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </LanguageProvider>
  );
}

export default App; 