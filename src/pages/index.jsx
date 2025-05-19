import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import HeroSection from '../components/HeroSection';
import MenuSection from '../components/MenuSection';
import ModalDish from '../components/ModalDish';
import ContactsSection from '../components/ContactsSection';
import Footer from '../components/Footer';
import { menu, categoryTranslations } from '../data/menu';
import logoImage from '../assets/sayqallogo.png';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const isRussian = language === LANGUAGES.RU;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on menu item click
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  // Modal dish handling
  const handleDishClick = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Menu categories and sections
  const menuCategories = [
    { id: 'salads', items: menu.salads },
    { id: 'soups', items: menu.soups },
    { id: 'mainDishes', items: menu.mainDishes },
    { id: 'kebabs', items: menu.kebabs },
    { id: 'lunchboxes', items: menu.lunchboxes },
    { id: 'sets', items: menu.sets },
    { id: 'sauces', items: menu.sauces }
  ];

  return (
    <div className="min-h-screen bg-sayqal-light text-gray-800">
      {/* Navbar */}
      <header 
        className="fixed w-full z-50 transition-all duration-300 bg-sayqal-cream/95 backdrop-blur-sm py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo and Restaurant Name */}
            <div className="flex items-center space-x-3">
              <img 
                src={logoImage} 
                alt="Sayqal Logo" 
                className="h-12 w-12 transition-all duration-300 rounded-full border-2 border-sayqal-gold object-cover"
              />
              <div className="text-2xl font-bold font-playfair transition-colors duration-300 text-sayqal-burgundy">
                Restaurant Sayqal
              </div>
            </div>
            
            {/* Navigation Links - Centered */}
            <div className="hidden md:flex items-center justify-center space-x-8 mx-auto">
              <ScrollLink 
                to="hero" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500} 
                className="transition-colors duration-300 cursor-pointer text-sayqal-burgundy hover:text-sayqal-gold font-medium"
                onClick={handleMenuItemClick}
              >
                {isRussian ? 'Главная' : 'Bosh sahifa'}
              </ScrollLink>

              <Link 
                to="/about"
                className="transition-colors duration-300 cursor-pointer text-sayqal-burgundy hover:text-sayqal-gold font-medium"
                onClick={handleMenuItemClick}
              >
                {isRussian ? 'Просмотр зала' : 'Zal ko\'rinishi'}
              </Link>
              <ScrollLink 
                to="contacts" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500} 
                className="transition-colors duration-300 cursor-pointer text-sayqal-burgundy hover:text-sayqal-gold font-medium"
                onClick={handleMenuItemClick}
              >
                {isRussian ? 'Контакты' : 'Bog\'lanish'}
              </ScrollLink>
            </div>
            
            {/* Language toggle */}
            <div className="flex items-center">
              <button 
                className="h-10 w-10 flex items-center justify-center rounded-full border-2 transition-all border-sayqal-gold text-sayqal-burgundy hover:bg-sayqal-gold hover:text-white font-medium"
                onClick={toggleLanguage}
                aria-label={isRussian ? 'Переключить язык' : 'Tilni o\'zgartirish'}
              >
                {isRussian ? 'UZ' : 'RU'}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden ml-2">
                <button 
                  className="p-2 focus:outline-none rounded text-sayqal-burgundy" 
                  onClick={toggleMenu}
                  aria-label={isRussian ? 'Открыть меню' : 'Menyuni ochish'}
                >
                  {isMenuOpen ? '✕' : '☰'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <motion.nav 
        className={`fixed top-20 left-0 right-0 bg-sayqal-cream/95 backdrop-blur-sm shadow-lg py-4 z-40 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col px-4 py-3 space-y-3">
          <ScrollLink 
            to="hero" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
            className="text-sayqal-burgundy hover:text-sayqal-gold transition-colors duration-300 py-2 font-medium"
            onClick={handleMenuItemClick}
          >
            {isRussian ? 'Главная' : 'Bosh sahifa'}
          </ScrollLink>

          <Link
            to="/about"
            className="text-sayqal-burgundy hover:text-sayqal-gold transition-colors duration-300 py-2 font-medium"
            onClick={handleMenuItemClick}
          >
            {isRussian ? 'Просмотр зала' : 'Zal ko\'rinishi'}
          </Link>
          <ScrollLink 
            to="contacts" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500} 
            className="text-sayqal-burgundy hover:text-sayqal-gold transition-colors duration-300 py-2 font-medium"
            onClick={handleMenuItemClick}
          >
            {isRussian ? 'Контакты' : 'Bog\'lanish'}
          </ScrollLink>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* Menu Section */}
        <section className="py-12 bg-sayqal-light">
          <div className="menu-container">
            <motion.h2 
              className="text-3xl md:text-4xl font-playfair font-bold text-sayqal-burgundy mb-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {isRussian ? 'Наше Меню' : 'Bizning Menyu'}
            </motion.h2>

            {menuCategories.map(category => (
              <React.Fragment key={category.id}>
                {category.items && category.items.length > 0 && (
                  <MenuSection 
                    category={category.id} 
                    items={category.items} 
                    onItemClick={handleDishClick}
                  />
                )}
              </React.Fragment>
            ))}
            
            {/* Section navigation card - placed between sauce section and about section */}
            <div className="flex justify-center mt-12 mb-12">
              <Link to="/about">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 15px 30px rgba(123, 3, 29, 0.15)",
                    scale: 1.03
                  }}
                  className="w-64 h-56 relative overflow-hidden rounded-xl shadow-md bg-gradient-to-br from-white to-sayqal-cream cursor-pointer flex flex-col items-center justify-center px-4"
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-sayqal-burgundy/30 rounded-tl-lg"></div>
                    <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-sayqal-burgundy/30 rounded-br-lg"></div>
                    <motion.div 
                      className="absolute -right-8 -top-8 w-16 h-16 bg-sayqal-gold/10 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.3, 0.5]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    <motion.div 
                      className="absolute -left-4 -bottom-4 w-20 h-20 bg-sayqal-burgundy/10 rounded-full"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.2, 0.3]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="z-10 flex flex-col items-center justify-center mt-2">
                    <motion.div 
                      className="text-sayqal-burgundy text-2xl font-bold mb-3 font-playfair relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      {isRussian ? 'Просмотр зала' : 'Zal ko\'rinishi'}
                      <motion.div 
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-sayqal-gold"
                        initial={{ width: "30%", left: "35%" }}
                        whileHover={{ width: "100%", left: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="mt-2 text-sayqal-burgundy/70 text-sm"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isRussian ? 'Перейти к просмотру' : 'Ko\'rishga o\'tish'}
                    </motion.div>
                  </div>
                  
                  {/* Animated arrow */}
                  <motion.div 
                    className="absolute bottom-6 right-6 text-sayqal-burgundy"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </motion.div>
              </Link>
            </div>
          </div>
        </section>

        {/* Contacts Section */}
        <ContactsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <ModalDish 
        isOpen={isModalOpen}
        dish={selectedDish} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Home; 
