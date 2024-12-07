import React from 'react';
import { motion } from 'framer-motion';

interface FancyButtonProps {
  text?: string;
  onClick?: () => void;
}

const FancyButton: React.FC<FancyButtonProps> = ({ text = 'Click Me', onClick }) => {
  return (
    <motion.button
      className="px-6 py-3 glass rounded-full font-bold text-white shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default FancyButton;