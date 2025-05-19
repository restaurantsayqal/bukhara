# Technical Context: Bukhara Restaurant Website

## Core Technologies

### Frontend Framework
- **React 19**: Latest version of React with improved rendering and hooks
- **React Router 7**: For client-side routing and navigation
- **React DOM**: For rendering React components to the DOM

### UI & Styling
- **Tailwind CSS 3**: Utility-first CSS framework for styling
- **PostCSS**: For processing CSS with plugins
- **Autoprefixer**: For adding vendor prefixes to CSS
- **Framer Motion**: Animation library for React

### State Management
- **React Context API**: For managing global state where needed
- **React Hooks**: useState, useEffect, useContext, etc.

### Performance & Optimization
- **React Intersection Observer**: For lazy loading and scroll-based animations
- **Sharp**: For image optimization
- **Source Map Explorer**: For analyzing bundle size
- **Web Vitals**: For measuring performance metrics

### Development Tools
- **React Scripts**: Create React App scripts for development
- **ESLint**: For code linting
- **Jest & Testing Library**: For unit and integration testing
- **Node.js**: Required for development environment

### Deployment
- **GitHub Pages**: Hosting platform for the website
- **Custom Scripts**: For build and deployment optimization

## Development Environment Setup

### Prerequisites
- Node.js (LTS version)
- npm or yarn package manager
- Git for version control

### Installation
```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm start
```

### Build Process
```bash
# Optimize images
npm run optimize:images

# Fix gallery issues
npm run fix:gallery

# Build for production with optimizations
npm run build:prod

# Deploy to GitHub Pages
npm run deploy
```

## Performance Considerations
- Image optimization is critical for site speed
- Bundle size monitoring with source-map-explorer
- Code splitting for route-based components
- Lazy loading for images and heavy components

## Browser Compatibility
- Production build targets browsers with >0.2% market share
- Development focuses on latest Chrome, Firefox, and Safari versions
- IE11 not supported

## External Services
- None currently integrated (potential for reservation systems, etc.)

## Security Considerations
- No sensitive data handling currently
- Static site with no server-side processing
- Login page exists as placeholder for future functionality 