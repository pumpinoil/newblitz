import React from 'react';
import { motion } from 'framer-motion';

interface DragPreviewProps {
  children: React.ReactNode;
  isDragging: boolean;
}

const DragPreview: React.FC<DragPreviewProps> = ({ children, isDragging }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        scale: isDragging ? 1.05 : 1,
        boxShadow: isDragging ? '0 8px 16px rgba(0, 0, 0, 0.2)' : 'none',
        opacity: isDragging ? 0.6 : 1,
      }}
      transition={{
        duration: 0.15,
        ease: 'easeInOut'
      }}
      className="relative"
      style={{
        pointerEvents: isDragging ? 'none' : 'auto',
        width: '300px',
        height: '200px',
        transformOrigin: 'center center'
      }}
    >
      {children}
    </motion.div>
  );
};

export default DragPreview;