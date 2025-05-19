import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { ensureImagePaths } from '../utils/ensureImagePath';

/**
 * Reliable image gallery component
 * @param {Object} props
 * @param {Array} props.images - Array of image paths
 * @param {string} props.title - Gallery title
 * @param {string} props.className - Additional CSS classes
 */
const ImageGallery = ({ 
  images = [], 
  title = 'Галерея',
  className = '',
  imageClassName = 'h-64 object-cover', 
}) => {
  // Ensure all image paths are correctly formatted
  const formattedImages = ensureImagePaths(images);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Early return if no images
  if (!formattedImages.length) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="bg-gray-100 h-64 flex items-center justify-center rounded">
          <p className="text-gray-500">Нет изображений для отображения</p>
        </div>
      </div>
    );
  }

  const handlePrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? formattedImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === formattedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        
        <div 
          className="relative rounded overflow-hidden cursor-pointer" 
          onClick={openModal}
        >
          <OptimizedImage
            src={formattedImages[currentIndex]}
            alt={`${title} - изображение ${currentIndex + 1}`}
            className={`w-full ${imageClassName}`}
            priority={currentIndex === 0}
          />
          
          {formattedImages.length > 1 && (
            <>
              <button 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow"
                onClick={handlePrevious}
                aria-label="Предыдущее изображение"
              >
                ←
              </button>
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow"
                onClick={handleNext}
                aria-label="Следующее изображение"
              >
                →
              </button>
            </>
          )}
        </div>
        
        {formattedImages.length > 1 && (
          <div className="flex justify-center mt-2">
            {formattedImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 mx-1 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-sayqal-burgundy' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Изображение ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={formattedImages[currentIndex]}
                alt={`${title} - изображение ${currentIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain"
                priority={true}
              />
              
              <button 
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center"
                onClick={closeModal}
                aria-label="Закрыть"
              >
                ✕
              </button>
              
              {formattedImages.length > 1 && (
                <>
                  <button 
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious(e);
                    }}
                    aria-label="Предыдущее изображение"
                  >
                    ←
                  </button>
                  <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext(e);
                    }}
                    aria-label="Следующее изображение"
                  >
                    →
                  </button>
                </>
              )}
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                {formattedImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    aria-label={`Изображение ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery; 