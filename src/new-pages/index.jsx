import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="p-6">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-[#6c0000] mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Welcome to Sayqal Restaurant
      </motion.h1>

      {/* Other content */}
    </main>
  );
} 
