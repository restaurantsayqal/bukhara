import React from "react";
import { motion } from "framer-motion";
import { useLanguage, LANGUAGES } from '../context/LanguageContext';

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Footer = () => {
  const { language } = useLanguage();
  const isRussian = language === LANGUAGES.RU;

  return (
    <footer className="bg-sayqal-burgundy text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            variants={footerVariants}
            className="text-center"
          >
            <p className="text-sayqal-cream">
              &copy; 2025 Restaurant Sayqal. {isRussian ? 'Все права защищены' : 'Barcha huquqlar himoyalangan'}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
