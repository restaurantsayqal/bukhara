import React from "react";
import { motion } from "framer-motion";
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';

const HeroSection = () => {
  const { language } = useLanguage();
  const isRussian = language === LANGUAGES.RU;
  
  const scrollToMenu = () => {
    const menuSection = document.querySelector(".menu-container");
    if (menuSection) {
      const offsetPosition = menuSection.offsetTop - 100;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Стили для фонового изображения с параллакс эффектом
  const heroBackgroundStyle = {
    backgroundImage: `url('${process.env.PUBLIC_URL}/background/herosection.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <section 
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-4 md:px-20"
      style={heroBackgroundStyle}
    >
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Left side - Text and button */}
      <div className="relative z-10 max-w-2xl mx-auto md:mx-0 md:ml-16 mt-24 md:mt-0 text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 drop-shadow-lg"
        >
          {isRussian ? (
            <>
              Вас ждёт<br />
              узбекское<br />
              гостеприимство...
            </>
          ) : (
            <>
              Sizni o'zbekona<br />
              mehmondo'stlik<br />
              kutmoqda...
            </>
          )}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <button
            onClick={scrollToMenu}
            className="bg-sayqal-gold hover:bg-sayqal-gold/90 text-sayqal-burgundy font-medium rounded-xl px-8 py-4 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            {isRussian ? 'Посмотреть меню' : 'Menyuni ko\'rish'}
          </button>
          
          <Link 
            to="/about" 
            className="bg-sayqal-burgundy hover:bg-sayqal-burgundy/90 text-sayqal-gold font-medium rounded-xl px-8 py-4 text-lg shadow-lg transition-all duration-300 hover:shadow-xl text-center"
          >
            {isRussian ? 'Просмотр залов' : 'Zallarni ko\'rish'}
          </Link>
        </motion.div>
      </div>
      
      {/* Right side - Logo */}
      <div className="relative z-10 flex items-start justify-center mt-8 md:mt-0 md:mr-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-[180px] h-[180px] md:w-[350px] md:h-[350px] flex items-center justify-center"
        >
          <img 
            src={`${process.env.PUBLIC_URL}/background/sayqal-logo.png`}
            alt="Sayqal Restaurant Logo" 
            className="w-full h-full object-contain drop-shadow-lg"
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 
