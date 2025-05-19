/**
 * Ensures an image path is correctly formatted with PUBLIC_URL
 * Handles both relative and absolute paths
 * 
 * @param {string} path - The image path to format
 * @returns {string} - Properly formatted image path
 */
export const ensureImagePath = (path) => {
  // If path is null or undefined, return fallback
  if (!path) {
    return `${process.env.PUBLIC_URL}/images/background/uzbek-pattern.jpg`;
  }
  
  // If path already includes PUBLIC_URL, return as is
  if (path.includes('process.env.PUBLIC_URL') || path.includes('${process.env.PUBLIC_URL}')) {
    return path;
  }
  
  // If path already starts with the actual public URL value, return as is
  if (path.startsWith('/bukhara/')) {
    return path;
  }
  
  // If path is relative (doesn't start with /), add PUBLIC_URL
  if (!path.startsWith('/')) {
    return `${process.env.PUBLIC_URL}/${path}`;
  }
  
  // For absolute paths that start with / but not with /bukhara
  return `${process.env.PUBLIC_URL}${path}`;
};

/**
 * Ensures all image paths in an array are correctly formatted
 * 
 * @param {string[]} paths - Array of image paths
 * @returns {string[]} - Array of properly formatted image paths
 */
export const ensureImagePaths = (paths) => {
  if (!Array.isArray(paths)) {
    return [];
  }
  
  return paths.map(path => ensureImagePath(path));
};

export default ensureImagePath; 