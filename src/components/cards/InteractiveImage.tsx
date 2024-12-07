import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InteractiveImageProps {
  src?: string;
  alt?: string;
}

const InteractiveImage: React.FC<InteractiveImageProps> = ({
  src = 'https://picsum.photos/400/300',
  alt = 'Interactive Image'
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg"
      whileHover={{ scale: 1.05 }}
      onClick={() => setIsZoomed(!isZoomed)}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={{ scale: isZoomed ? 1.5 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default InteractiveImage;