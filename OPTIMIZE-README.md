# Sayqal Restaurant Website Optimization

This document explains how to optimize and deploy your restaurant website to GitHub Pages with improved performance.

## Quick Start

Run the combined optimization script with a single command:

```bash
node optimize.js
```

This will run all optimization steps in the correct order:

1. Optimize images (convert to WebP, reduce size)
2. Fix image paths throughout the codebase
3. Optimize for mobile devices
4. Enhance performance with lazy loading and smooth scrolling
5. Fix router for GitHub Pages (use HashRouter)
6. Build an optimized production bundle
7. Deploy to GitHub Pages

## Individual Optimization Commands

If you prefer to run optimizations individually, you can use these commands:

### 1. Optimize Images

Converts JPG/PNG images to optimized WebP format with reduced file size:

```bash
node ./scripts/image-optimization.js
```

### 2. Fix Image Paths

Updates all image references in the codebase to use the optimized WebP images:

```bash
node ./scripts/fix-image-paths.js
```

### 3. Mobile Optimization

Enhances the website for mobile devices with better viewport settings and responsive layouts:

```bash
node ./scripts/mobile-optimize.js
```

### 4. Performance Boost

Adds lazy loading for images and smooth scrolling to improve page performance:

```bash
node ./scripts/perf-boost.js
```

### 5. Router Fix for GitHub Pages

Replaces BrowserRouter with HashRouter to prevent white screen issues on GitHub Pages:

```bash
node ./scripts/router-fix.js
```

### 6. Build and Deploy

Create an optimized production build and deploy to GitHub Pages:

```bash
npm run build
npx gh-pages -d build
```

## What These Scripts Do

### Image Optimization
- Converts all JPG/PNG images to WebP format
- Reduces image quality to 75% (still visually excellent)
- Creates a mapping between original and optimized images

### Fix Image Paths
- Updates all image references in code to point to optimized WebP versions
- Enhances OptimizedImage component to support WebP with fallbacks
- Provides better error handling for image loading

### Mobile Optimization
- Updates viewport meta tags for better mobile display
- Adds touch-action optimizations for mobile devices
- Enhances CSS for better mobile display (reduced padding, better text sizes)
- Fixes common responsive layout issues in components

### Performance Boost
- Adds utilities for image preloading
- Implements smooth scrolling for hash links
- Adds lazy loading to all images
- Adds throttling to scroll event handlers

### Router Fix
- Changes BrowserRouter to HashRouter for GitHub Pages compatibility
- Updates homepage in package.json

## Troubleshooting

If you encounter any issues:

1. Check if all required scripts exist in the ./scripts directory
2. Make sure you have all required dependencies installed:
   ```bash
   npm install fs-extra glob sharp
   ```
3. If image optimization fails, ensure the sharp package is properly installed:
   ```bash
   npm install sharp@latest
   ```
4. For GitHub Pages deployment issues, ensure you have set up GitHub repository correctly

## Additional Notes

- The optimized images are stored in `public/optimized` directory
- Image path mappings are stored in `src/utils/image-paths.json`
- Performance utilities are added to `src/utils` directory 