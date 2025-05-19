import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import '../styles/Hero.css';
import { Link } from 'react-scroll';

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

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center md:items-start justify-between pt-36 px-6 md:px-20 bg-[#fdf8e4]">
      {/* ����� ����� � ������� */}
      <div className="max-w-2xl mt-10 ml-12 md:ml-28">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#6c0000] leading-tight mb-6"
        >
          {isRussian ? (
            <>
              ��� ���<br />
              ���������<br />
              ��������������...
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
        >
          <button
            onClick={scrollToMenu}
            className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl px-6 py-3 text-lg shadow-md"
          >
            {isRussian ? '���������� ����' : 'Menyuni ko\'rish'}
          </button>
        </motion.div>
      </div>
      
      {/* ������ ����� � ��������� */}
      <motion.div 
        className="mt-10 md:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img loading="lazy" src="/bukhara/images/background/logo sayqal without backgorund.png"
          alt="Sayqal Logo"
          className="w-[200px] md:w-[300px] h-auto"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
