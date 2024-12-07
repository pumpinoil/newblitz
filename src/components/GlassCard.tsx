import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { MagickCardProps } from '../types/magickCard';

interface GlassCardProps {
  id: string;
  index: number;
  label: string;
  children?: React.ReactNode;
  card?: MagickCardProps;
  onSettingsClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ id, index, label, children, card, onSettingsClick }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            glass p-4 rounded-lg backdrop-blur-lg relative
            hover:bg-white/10 cursor-grab active:cursor-grabbing group
            transition-all duration-200 ease-in-out
          `}
          animate={{
            scale: snapshot.isDragging ? 1.05 : 1,
            boxShadow: snapshot.isDragging ? '0 8px 32px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
          style={{
            ...provided.draggableProps.style,
            opacity: card?.opacity || 0.9,
            backgroundColor: card?.backgroundColor || 'rgba(255, 255, 255, 0.1)',
            borderRadius: `${card?.borderRadius || 10}px`,
            borderWidth: `${card?.borderWidth || 1}px`,
            borderColor: card?.borderColor || 'rgba(255, 255, 255, 0.2)',
            boxShadow: card?.glowEffect ? `0 0 20px ${card.glowColor}` : 'none',
            backdropFilter: `blur(${card?.blur || 5}px)`,
            width: '100%',
            height: '100%',
            minHeight: '100px'
          }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex-1">
              <h3 className="font-medium text-white">{label}</h3>
            </div>
            <button 
              className="card-settings-trigger p-2 rounded-full hover:bg-white/20 
                       transition-colors opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onSettingsClick?.();
              }}
            >
              <Settings className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="prose prose-invert max-w-none">
            {children}
          </div>
        </motion.div>
      )}
    </Draggable>
  );
};

export default GlassCard;