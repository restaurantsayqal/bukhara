import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { menuItems } from '../data/menu';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';

const MenuPage: React.FC = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState(menuItems);

  // Update filtered items when category, search query, or menuItems change
  useEffect(() => {
    const filtered = menuItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description[language].toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredItems(filtered);
  }, [selectedCategory, searchQuery, language, menuItems]);

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  const handleAddToCart = (itemId: string) => {
    addToCart(itemId);
  };

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId);
  };

  return (
    <div className="min-h-screen bg-sayqal-cream pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-sayqal-brown"
        >
          {language === 'ru' ? 'Меню' : 'Menyu'}
        </motion.h1>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <input
            type="text"
            placeholder={language === 'ru' ? 'Поиск блюд...' : 'Taomlarni qidirish...'}
            className="w-full p-3 rounded-lg border border-sayqal-brown/20 focus:outline-none focus:border-sayqal-brown"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? 'bg-sayqal-brown text-white'
                    : 'bg-white text-sayqal-brown'
                }`}
              >
                {language === 'ru' 
                  ? category === 'all' ? 'Все' : category === 'hot' ? 'Горячие' : 'Холодные'
                  : category === 'all' ? 'Barchasi' : category === 'hot' ? 'Issiq' : 'Sovuq'
                }
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name[language]}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-sayqal-brown mb-2">
                  {item.name[language]}
                </h3>
                <p className="text-gray-600 mb-4">{item.description[language]}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-sayqal-brown">
                    {item.price} {language === 'ru' ? '₽' : 'so'm'}
                  </span>
                  <div className="flex items-center gap-2">
                    {getItemQuantity(item.id) > 0 ? (
                      <>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="p-2 rounded-full bg-sayqal-brown/10 text-sayqal-brown"
                        >
                          <FiMinus />
                        </button>
                        <span className="text-sayqal-brown font-semibold">
                          {getItemQuantity(item.id)}
                        </span>
                        <button
                          onClick={() => handleAddToCart(item.id)}
                          className="p-2 rounded-full bg-sayqal-brown/10 text-sayqal-brown"
                        >
                          <FiPlus />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-sayqal-brown text-white rounded-full"
                      >
                        <FiShoppingCart />
                        <span>{language === 'ru' ? 'В корзину' : 'Savatga'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage; 