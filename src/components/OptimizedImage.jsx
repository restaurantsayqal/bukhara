import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { preloadImage, isImageCached } from '../utils/imagePreloader';
import ensureImagePath from '../utils/ensureImagePath';

/**
 * Оптимизированный компонент изображений с улучшенной производительностью
 */
const OptimizedImage = memo(({
  src,
  alt,
  className = '',
  width,
  height,
  fallbackSrc = '/bukhara/images/background/uzbek-pattern.jpg',
  priority = false,
  animate = true,
  ...props
}) => {
  // Ensure paths are correctly formatted
  const formattedSrc = ensureImagePath(src);
  const formattedFallback = ensureImagePath(fallbackSrc);
  
  const [loaded, setLoaded] = useState(isImageCached(formattedSrc));
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(formattedSrc);
  
  // Сбрасываем состояние при изменении источника изображения
  useEffect(() => {
    setImageSrc(formattedSrc);
    setLoaded(isImageCached(formattedSrc));
    setError(false);
  }, [formattedSrc]);
  
  useEffect(() => {
    // Если изображение уже загружено или произошла ошибка, ничего не делаем
    if (loaded || error) return;
    
    // Предотвращаем утечки памяти при размонтировании
    let isMounted = true;
    
    // Высокоприоритетная загрузка без задержки
    if (priority) {
      const img = new Image();
      img.src = formattedSrc;
      img.onload = () => isMounted && setLoaded(true);
      img.onerror = () => {
        if (isMounted) {
          console.error(`Ошибка загрузки изображения: ${formattedSrc}`);
          setError(true);
          setImageSrc(formattedFallback);
        }
      };
    } else {
      // Низкоприоритетная загрузка с небольшой задержкой
      const timer = setTimeout(() => {
        preloadImage(formattedSrc)
          .then(() => isMounted && setLoaded(true))
          .catch((err) => {
            if (isMounted) {
              console.error(`Ошибка загрузки изображения: ${formattedSrc}`, err);
              setError(true);
              setImageSrc(formattedFallback);
            }
          });
      }, priority ? 0 : 100);
      
      return () => {
        clearTimeout(timer);
        isMounted = false;
      };
    }
    
    return () => {
      isMounted = false;
    };
  }, [formattedSrc, formattedFallback, priority, loaded, error]);
  
  // Упрощенный обработчик ошибки загрузки изображения
  const handleError = () => {
    setError(true);
    setImageSrc(formattedFallback);
    console.warn(`Image failed to load: ${formattedSrc}, using fallback: ${formattedFallback}`);
  };
  
  // Упрощенный плейсхолдер для состояния загрузки
  const renderPlaceholder = () => {
    if (loaded) return null;
    
    return (
      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
      </div>
    );
  };
  
  // Рендерим различные варианты изображения в зависимости от настроек
  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ width, height }}
    >
      {/* Плейсхолдер */}
      {renderPlaceholder()}
      
      {/* Сообщение об ошибке */}
      {error && imageSrc === formattedFallback && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
            Изображение не найдено
          </div>
        </div>
      )}
      
      {/* Изображение - используем motion только если нужна анимация */}
      {animate ? (
        <motion.img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-150 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading={priority ? 'eager' : 'lazy'}
          width={width}
          height={height}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          {...props}
        />
      ) : (
        <picture>
          <source 
            srcSet={formattedSrc.endsWith('.webp') ? formattedSrc : formattedSrc.replace(/\.(jpe?g|png)$/, '.webp')} 
            type="image/webp" 
          />
          <img 
            src={imageSrc}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-150 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            loading={priority ? 'eager' : 'lazy'}
            width={width}
            height={height}
            onError={handleError}
            {...props}
          />
        </picture>
      )}
    </div>
  );
});

// Дисплейное имя для отладки
OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage; 
