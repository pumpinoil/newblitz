import React from 'react';
import { motion } from 'framer-motion';

interface IconWithTooltipProps {
  icon?: string;
  tooltip?: string;
}

const IconWithTooltip: React.FC<IconWithTooltipProps> = ({ 
  icon = '✨',
  tooltip = 'Magical tooltip'
}) => {
  return (
    <motion.div
      className="relative inline-block"
      whileHover="hover"
    >
      <span className="text-2xl">{icon}</span>
      <motion.div
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 glass rounded-lg text-sm"
        initial={{ opacity: 0, y: 10 }}
        variants={{
          hover: { opacity: 1, y: 0 }
        }}
      >
        {tooltip}
      </motion.div>
    </motion.div>
  );
};

export default IconWithTooltip;