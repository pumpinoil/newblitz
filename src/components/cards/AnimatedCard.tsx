import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  content?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ content }) => {
  return (
    <motion.div
      className="p-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div dangerouslySetInnerHTML={{ __html: content || '<p>Animated content goes here...</p>' }} />
    </motion.div>
  );
};

export default AnimatedCard;