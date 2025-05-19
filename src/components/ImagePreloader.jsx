import { useEffect } from 'react';
import { preloadImages } from '../utils/imagePreloader';

// Список основных изображений для предзагрузки
const criticalImages = [
  // Фоновые изображения
  '/bukhara/images/background/background(1).png',
  '/bukhara/images/background/background(2).png',
  '/bukhara/images/background/uzbek-pattern.jpg',
  
  // Основные изображения на странице About
  '/bukhara/images/sertificate/ChatGPT Image 6 апр. 2025 г., 17_53_15.png',
  '/bukhara/images/about/premium/DSC01398.jpg',
  '/bukhara/images/about/vip/DSC01398.jpg',
  '/bukhara/images/about/obshiy/DSC01421.jpg',
  '/bukhara/images/about/kabinka/DSC01417.jpg',
  '/bukhara/images/about/kabinka/DSC01427.jpg',
  
  // Логотип и иконки
  '/bukhara/images/sayqal-logo.png'
];

/**
 * Компонент для предзагрузки критически важных изображений
 * Не оказывает влияния на визуальный интерфейс
 */
const ImagePreloader = () => {
  useEffect(() => {
    // Предзагрузка критических изображений с низким приоритетом
    const preloadCriticalImages = async () => {
      try {
        // Используем setTimeout чтобы не блокировать основной поток
        setTimeout(() => {
          preloadImages(criticalImages)
            .then(() => console.log('Critical images preloaded'))
            .catch(err => console.warn('Error preloading images:', err));
        }, 1000); // Отложить загрузку на 1 секунду после монтирования
      } catch (error) {
        console.warn('Error in image preloader:', error);
      }
    };

    preloadCriticalImages();
  }, []);

  // Этот компонент не отображает ничего
  return null;
};

export default ImagePreloader; 
