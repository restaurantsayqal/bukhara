import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";

const DishCard = ({ dish }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.div
        onDoubleClick={toggleModal}
        whileHover={{ scale: 1.02 }}
        className="cursor-pointer rounded-2xl bg-white shadow-md p-2 transition duration-300 flex flex-col justify-between"
      >
        <div className="relative">
          <img loading="lazy" src={dish.image} alt={dish.name} className="rounded-xl w-full" />
          <span className="absolute top-2 left-2 bg-yellow-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
            {dish.weight}
          </span>
        </div>
        <div className="p-3 flex flex-col gap-2">
          <h3 className="text-sayqal-burgundy font-bold text-lg">{dish.name}</h3>
          <p className="text-sm text-gray-700 line-clamp-3 md:line-clamp-none">
            {dish.ingredients}
          </p>
        </div>
      </motion.div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={toggleModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-md w-full rounded-2xl bg-white p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold text-sayqal-burgundy mb-4">
              {dish.name}
            </Dialog.Title>
            <img loading="lazy" src={dish.image} alt={dish.name} className="rounded-xl w-full mb-4" />
            <p className="text-gray-700"><strong>Og'irligi:</strong> {dish.weight}</p>
            <p className="text-gray-700 mt-2"><strong>Masalliqlar:</strong> {dish.ingredients}</p>
            <button
              onClick={toggleModal}
              className="mt-4 bg-sayqal-burgundy text-white px-4 py-2 rounded-lg"
            >
              Yopish
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default DishCard; 
