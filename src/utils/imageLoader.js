/**
 * Утилита для оптимизации загрузки изображений
 */
import React, { useState, useEffect, Fragment } from 'react';

// Кэш для хранения предзагруженных изображений
const imageCache = new Map();

/**
 * Предзагружает изображение и возвращает промис
 * @param {string} src - путь к изображению
 * @returns {Promise} - промис, который разрешается, когда изображение загружено
 */
export const preloadImage = (src) => {
  // Проверяем, есть ли изображение в кэше
  if (imageCache.has(src)) {
    return imageCache.get(src);
  }

  // Создаем новый промис для загрузки изображения
  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Не удалось загрузить изображение: ${src}`));
    img.src = src;
  });

  // Сохраняем промис в кэше
  imageCache.set(src, promise);
  return promise;
};

/**
 * Предзагружает массив изображений
 * @param {Array<string>} sources - массив путей к изображениям
 * @returns {Promise} - промис, который разрешается, когда все изображения загружены
 */
export const preloadImages = (sources) => {
  return Promise.all(sources.map(preloadImage));
};

/**
 * React Hook для использования изображения с предзагрузкой
 * @param {string} src - путь к изображению
 * @param {string} fallbackSrc - резервный путь к изображению
 * @returns {Object} - объект с src и loading статусом
 */
export const useImageLoader = (src, fallbackSrc = null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(fallbackSrc || src);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      try {
        await preloadImage(src);
        if (isMounted) {
          setImgSrc(src);
          setLoading(false);
        }
      } catch (e) {
        if (isMounted) {
          console.error('Ошибка загрузки изображения:', e);
          setError(true);
          setLoading(false);
          if (fallbackSrc) {
            setImgSrc(fallbackSrc);
          }
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [src, fallbackSrc]);

  return { src: imgSrc, loading, error };
};

/**
 * Компонент для отложенной загрузки изображений
 */
export const LazyImage = ({ src, alt, fallbackSrc, className, width, height, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
    if (fallbackSrc) {
      console.log(`Не удалось загрузить изображение ${src}, использую резервное изображение`);
    }
  };

  return (
    <Fragment>
      <img
        src={isError && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        width={width}
        height={height}
        data-fallback={fallbackSrc}
        {...props}
      />
    </Fragment>
  );
};

export default { preloadImage, preloadImages, useImageLoader, LazyImage }; 
