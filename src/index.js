import React from 'react';
import { initSmoothScroll } from './utils/smoothScroll';

import { preloadCriticalImages } from './utils/imagePreloader';

import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import reportWebVitals from './reportWebVitals';

// Get the basename from the homepage in package.json
const getBasename = () => {
  // Default to /bukhara as per GitHub Pages setup
  return '/bukhara';
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <Router basename="">
        <App />
      </Router>
    </LanguageProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Updated for GitHub Pages with all images - April 2025
