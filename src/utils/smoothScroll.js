// Smooth Scroll Utility
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
