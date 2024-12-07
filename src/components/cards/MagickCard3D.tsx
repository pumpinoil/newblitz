import React from 'react';
import { motion } from 'framer-motion';

interface MagickCard3DProps {
  content?: string;
}

const MagickCard3D: React.FC<MagickCard3DProps> = ({ content }) => {
  return (
    <motion.div
      className="p-4 perspective-1000"
      whileHover={{ rotateY: 15, rotateX: -15 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="glass rounded-lg p-4"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div dangerouslySetInnerHTML={{ __html: content || '3D Content' }} />
      </div>
    </motion.div>
  );
};

export default MagickCard3D;