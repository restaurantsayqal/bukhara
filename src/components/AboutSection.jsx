import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
// Import statement for halal image (or we'll use a public path)
const halalImagePath = "/bukhara/images/about/ChatGPT Image 6 апр. 2025 г., 16_48_45.png";
const certificateImagePath = "/bukhara/images/sertificate/ChatGPT Image 6 апр. 2025 г., 17_53_15.png";

const AboutSection = () => {
  const { language } = useLanguage();
  const isRussian = language === LANGUAGES.RU;
  
  const handleOpenNewPage = () => {
    // Open a new page/tab with the specified URL
    window.open('https://halal.uz', '_blank');
  };

  return (
    <section id="about" className="bg-yellow-50 py-10 px-4 sm:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        className="flex flex-col w-full mb-24 text-center"
      >
        <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-5xl font-playfair">
          {isRussian ? 'Просмотр зала' : 'Zal ko\'rinishi'}
        </h1>
      </motion.div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-8 max-w-6xl mx-auto">
        {/* Matn bloki */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-6 text-gray-800 text-base sm:text-lg leading-relaxed space-y-5"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <strong>{isRussian ? 'Ресторан Sayqal' : 'Restaurant Sayqal'}</strong>
            {isRussian 
              ? ' — это не просто место для еды. Здесь каждое блюдо, каждая услуга, каждая деталь создаётся с вниманием.'
              : ' — bu oddiy ovqatlanish joyi emas. Bu yerda har bir taom, har bir xizmat, har bir tafsilot e\'tibor bilan yaratiladi.'}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <strong>Sayqal</strong>
            {isRussian
              ? ' — ресторан с сертификатом халяль, что означает не только использование продуктов, соответствующих шариату, но и ведение всего процесса с чистотой, справедливостью и ответственностью.'
              : ' — halol sertifikatga ega restoran bo\'lib, bu nafaqat shariatga muvofiq mahsulotlardan foydalanish, balki butun boshli jarayonning poklik, adolat va mas\'uliyat bilan olib borilishini bildiradi.'}
          </motion.p>

          {/* Har bir band */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex items-start gap-2"
          >
            <span className="text-xl">🍽️</span>
            <p>
              <strong>{isRussian ? 'Наши блюда' : 'Taomlarimiz'}</strong>
              {isRussian
                ? ' — приготовлены только из халяльных, надёжных и здоровых продуктов. Каждое блюдо является примером гармонии национальных и современных кулинарных методов.'
                : ' — faqat halol, ishonchli va sog\'lom mahsulotlardan tayyorlanadi. Har bir taom milliy va zamonaviy oshpazlik usullarining uyg\'unlashgan namunasi.'}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex items-start gap-2"
          >
            <span className="text-xl">👨‍🍳</span>
            <p>
              <strong>{isRussian ? 'Наша команда' : 'Jamoamiz'}</strong>
              {isRussian
                ? ' — мастера своего дела, искренние и ответственные специалисты, стремящиеся тепло встретить каждого гостя, как в своём доме, и создать комфорт.'
                : ' — o\'z ishining ustalari, har bir mehmonni xuddi o\'z uyidagidek iliq kutib olishga, qulaylik yaratishga intiladigan samimiy va mas\'uliyatli mutaxassislar.'}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
            className="flex items-start gap-2"
          >
            <span className="text-xl">🏛️</span>
            <p>
              <strong>{isRussian ? 'Внутренний интерьер' : 'Ichki interyer'}</strong>
              {isRussian
                ? ' — украшен национальным духом, узорами атласа и золотого шитья, чтобы наши гости чувствовали себя в атмосфере древнего узбекского гостеприимства.'
                : ' — mehmonlarimiz o\'zini qadimiy o\'zbek mehmondo\'stligi muhitida his qilishi uchun milliy ruh, atlas va zardo\'z naqshlari bilan bezatilgan.'}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex items-start gap-2"
          >
            <span className="text-xl">💫</span>
            <p>
              <strong>{isRussian ? 'Каждая деталь' : 'Har bir detal'}</strong>
              {isRussian
                ? ' — от посуды до обслуживания — в ресторане Sayqal вас ждут комфорт, чистота и халяльность.'
                : ' — idishlardan tortib, xizmatgacha — Sayqal restoranida sizni qulaylik, tozalik va halollik kutadi.'}
            </p>
          </motion.div>
        </motion.div>
        
        {/* Sertifikat rasmi - moved to the right side */}
        <motion.img 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          src={certificateImagePath} 
          alt={isRussian ? "Халяль Сертификат" : "Halal Sertifikati"} 
          className="w-64 sm:w-80 rounded-xl shadow-md mt-6 sm:mt-0" 
        />
      </div>

      {/* Photo Gallery with 2 images */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-6xl mx-auto"
      >
        {/* First image - Halal logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="bg-white p-4 rounded-xl shadow-md flex justify-center items-center h-64"
        >
          <div className="flex justify-center items-center h-full w-full">
            <img loading="lazy" src={halalImagePath} 
              alt="Halal Logo" 
              className="object-contain max-h-full max-w-full" 
            />
          </div>
        </motion.div>
        
        {/* Second image - Restaurant logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="bg-white p-4 rounded-xl shadow-md flex justify-center items-center h-64"
        >
          <div className="flex justify-center items-center h-full w-full">
            <img loading="lazy" src="/bukhara/images/about/ChatGPT Image 6 апр. 2025 г., 16_48_45.png" 
              alt="Restaurant Logo" 
              className="object-contain max-h-full max-w-full" 
            />
          </div>
        </motion.div>
      </motion.section>
    </section>
  );
};

export default AboutSection; 
