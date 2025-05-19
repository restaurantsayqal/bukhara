import React from 'react';
import { motion } from 'framer-motion';

// Стильный и современный компонент загрузки
const Loader = ({ size = 50, color = '#96453C', text = null, fullScreen = false }) => {
  return (
    <div className={`flex flex-col justify-center items-center ${fullScreen ? 'fixed inset-0 bg-white z-50' : ''}`}>
      <motion.div 
        className="relative"
        style={{ width: size, height: size }}
      >
        <motion.span 
          className="absolute inset-0 rounded-full"
          style={{ 
            border: `3px solid rgba(150, 69, 60, 0.1)`, 
            borderTopColor: color,
            borderLeftColor: color 
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        />
        <motion.span 
          className="absolute inset-2 rounded-full"
          style={{ 
            border: `2px solid rgba(173, 132, 36, 0.15)`, 
            borderBottomColor: '#AD8424',
            borderRightColor: '#AD8424'
          }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
        />
      </motion.div>
      
      {text && (
        <motion.p 
          className="mt-4 text-sayqal-burgundy font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Стильный полноэкранный загрузчик с анимацией
export const PageLoader = ({ text = "Загрузка..." }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="flex flex-col items-center">
        {/* Стильная анимация логотипа */}
        <motion.div
          className="w-28 h-28 mb-8 rounded-full border-3 border-sayqal-gold bg-white flex items-center justify-center overflow-hidden relative"
          animate={{ 
            scale: [1, 1.02, 1],
            boxShadow: [
              "0px 0px 0px rgba(173, 132, 36, 0.2)",
              "0px 0px 30px rgba(173, 132, 36, 0.3)",
              "0px 0px 0px rgba(173, 132, 36, 0.2)"
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut" 
          }}
        >
          {/* Декоративные элементы */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-sayqal-gold/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative z-10 golden-gradient rounded-3xl py-1 px-4 transform rotate-6">
            <span className="text-2xl font-playfair font-bold text-white">S</span>
          </div>
          
          {/* Вращающиеся круги */}
          <motion.div 
            className="absolute top-0 bottom-0 left-0 right-0 border-2 border-dashed border-sayqal-gold/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          />
        </motion.div>
        
        {/* Современный индикатор загрузки */}
        <motion.div 
          className="h-1 bg-sayqal-cream rounded-full mb-6 overflow-hidden"
          style={{ width: 240 }}
        >
          <motion.div 
            className="h-full golden-gradient"
            initial={{ x: '-100%' }}
            animate={{ x: ['100%', '-100%'] }}
            transition={{ 
              times: [0, 1],
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Текст загрузки */}
        <motion.div 
          className="text-sayqal-burgundy font-medium flex items-center"
          animate={{ 
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          <span>{text}</span>
          <motion.span 
            className="ml-2 inline-flex"
            animate={{ 
              opacity: [0, 1, 0, 0, 1, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8, 1]
            }}
          >
            ⋯
          </motion.span>
        </motion.div>
        
        {/* Подпись */}
        <motion.p 
          className="absolute bottom-6 text-xs text-sayqal-burgundy/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Restaurant Sayqal
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// Современный компонент загрузки для отдельных секций
export const ComponentLoader = ({ text = "Загрузка...", size = 40 }) => {
  return (
    <div className="w-full h-48 flex flex-col justify-center items-center bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-sayqal-gold/10">
      <Loader size={size} text={text} />
    </div>
  );
};

// Индикатор загрузки изображения с эффектом скелетона
export const ImageLoader = ({ width = 'w-full', height = 'h-64', rounded = 'rounded-xl' }) => {
  return (
    <div className={`${width} ${height} ${rounded} bg-gradient-to-r from-sayqal-cream/40 to-white/60 overflow-hidden relative`}>
      <motion.div 
        className="absolute inset-0 -translate-x-full" 
        animate={{ 
          x: ['-100%', '100%', '100%', '100%', '100%'], 
        }}
        transition={{ 
          repeat: Infinity, 
          repeatType: "loop", 
          duration: 2, 
          times: [0, 0.5, 0.5, 0.5, 1],
          ease: "easeInOut"
        }}
      >
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl" />
      </motion.div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-sayqal-burgundy/5 to-transparent" />
    </div>
  );
};

export default Loader; 
