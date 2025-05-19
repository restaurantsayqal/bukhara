import React from "react";
import { useLanguage, LANGUAGES } from '../context/LanguageContext';

const Hero = () => {
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

  return (
    <section className="min-h-screen bg-[#f8f4e3] flex flex-col-reverse items-center md:items-start px-6 md:px-20 py-20 md:py-32 relative">
      {/* Фоновое изображение с полупрозрачностью */}
      <div 
        className="absolute inset-0 z-0 opacity-10 bg-cover bg-center" 
        style={{ backgroundImage: 'url("/bukhara/images/background/IMG_7922.PNG")' }}
      ></div>
      
      {/* Контент с z-index для отображения над фоном */}
      <div className="z-10 max-w-xl md:pl-4">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold leading-tight mb-6 text-[#800000]">
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
        </h1>
        <button
          onClick={scrollToMenu}
          className="bg-[#D4AF37] text-white py-3 px-6 rounded-xl shadow-md text-lg hover:bg-[#FFC107] transition"
        >
          {isRussian ? 'Посмотреть меню' : 'Menyuni ko\'rish'}
        </button>
      </div>
    </section>
  );
};

export default Hero; 
import { useLanguage, LANGUAGES } from '../context/LanguageContext';

const Hero = () => {
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

  return (
    <section className="min-h-screen bg-[#f8f4e3] flex flex-col-reverse items-center md:items-start px-6 md:px-20 py-20 md:py-32 relative">
      {/* Фоновое изображение с полупрозрачностью */}
      <div 
        className="absolute inset-0 z-0 opacity-10 bg-cover bg-center" 
        style={{ backgroundImage: 'url("/bukhara/images/background/IMG_7922.PNG")' }}
      ></div>
      
      {/* Контент с z-index для отображения над фоном */}
      <div className="z-10 max-w-xl md:pl-4">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold leading-tight mb-6 text-[#800000]">
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
        </h1>
        <button
          onClick={scrollToMenu}
          className="bg-[#D4AF37] text-white py-3 px-6 rounded-xl shadow-md text-lg hover:bg-[#FFC107] transition"
        >
          {isRussian ? 'Посмотреть меню' : 'Menyuni ko\'rish'}
        </button>
      </div>
    </section>
  );
};

export default Hero; 
