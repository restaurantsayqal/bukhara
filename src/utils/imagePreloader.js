/**
 * Utility for preloading and caching images
 */

const IMAGE_CACHE = new Map();
const LOADING_PROMISES = new Map();

// Максимальный размер кеша
const MAX_CACHE_SIZE = 100;

/**
 * Preloads an image and stores it in cache
 * @param {string} src - Image source URL
 * @returns {Promise} - Promise that resolves when image is loaded
 */
export const preloadImage = (src) => {
  // Check if already in cache
  if (IMAGE_CACHE.has(src)) {
    return Promise.resolve(IMAGE_CACHE.get(src));
  }
  
  // Return a promise
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error('Image source is missing'));
      return;
    }
    
    const img = new Image();
    
    // Handle successful load
    img.onload = () => {
      IMAGE_CACHE.set(src, img);
      resolve(img);
    };
    
    // Handle error
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    // Set source to start loading
    img.src = src;
    
    // If the image is already complete, resolve immediately
    if (img.complete) {
      IMAGE_CACHE.set(src, img);
      resolve(img);
    }
  });
};

/**
 * Preloads multiple images in parallel
 * @param {Array<string>} sources - Array of image URLs
 * @param {Function} onProgress - функция обратного вызова для отслеживания прогресса
 * @returns {Promise} - Promise that resolves when all images are loaded
 */
export const preloadImages = (sources, onProgress) => {
  let loaded = 0;
  const total = sources.length;
  
  const updateProgress = () => {
    loaded++;
    if (onProgress && typeof onProgress === 'function') {
      onProgress(loaded / total);
    }
  };
  
  // Загружаем изображения с приоритетом
  const promises = sources.map((src, index) => {
    // Короткая задержка для последовательной загрузки 
    // чтобы не блокировать основной поток
    const delay = index * 50;
    
    return new Promise(resolve => {
      setTimeout(() => {
        preloadImage(src)
          .then(() => {
            updateProgress();
            resolve(src);
          })
          .catch(() => {
            // Даже если изображение не загрузилось, считаем прогресс
            updateProgress();
            resolve(null); // Резолвим с null для не загрузившихся изображений
          });
      }, delay);
    });
  });
  
  return Promise.all(promises);
};

/**
 * Checks if an image is in cache
 * @param {string} src - Image source URL
 * @returns {boolean} - True if image is cached
 */
export const isImageCached = (src) => {
  return IMAGE_CACHE.has(src);
};

/**
 * Returns image from cache or null if not cached
 * @param {string} src - Image source URL
 * @returns {Image|null} - Cached image or null
 */
export const getImageFromCache = (src) => {
  return IMAGE_CACHE.get(src) || null;
};

/**
 * Очищает кеш изображений
 * @param {Array<string>} [exceptSrcs] - массив URL, которые не нужно удалять из кеша
 */
export const clearImageCache = (exceptSrcs = []) => {
  if (!exceptSrcs || exceptSrcs.length === 0) {
    IMAGE_CACHE.clear();
    return;
  }
  
  const exceptSet = new Set(exceptSrcs);
  for (const src of IMAGE_CACHE.keys()) {
    if (!exceptSet.has(src)) {
      IMAGE_CACHE.delete(src);
    }
  }
};

/**
 * Предзагружает критические изображения для первого экрана
 * @param {Array<string>} criticalSrcs - массив URL критических изображений
 */
export const preloadCriticalImages = (criticalSrcs) => {
  if (!criticalSrcs || criticalSrcs.length === 0) return;
  
  criticalSrcs.forEach(src => {
    // Используем requestIdleCallback для загрузки во время простоя
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => preloadImage(src), { timeout: 1000 });
    } else {
      // Fallback для браузеров без поддержки requestIdleCallback
      setTimeout(() => preloadImage(src), 100);
    }
  });
};

export default {
  preloadImage,
  preloadImages,
  isImageCached,
  getImageFromCache,
  clearImageCache,
  preloadCriticalImages
}; 
