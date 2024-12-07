import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface DraggableItemProps {
  id: string;
  index: number;
  label: string;
  isActive: boolean;
  onHover: (id: string | null) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, index, label, isActive, onHover }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          animate={{
            opacity: isActive ? 1 : 0.5,
            scale: isActive ? 1.02 : 1,
            boxShadow: snapshot.isDragging ? '0 8px 16px rgba(0,0,0,0.2)' : 'none',
            backgroundColor: snapshot.isDragging ? 'rgba(255, 255, 255, 0.15)' : undefined
          }}
          transition={{ duration: 0.2 }}
          onHoverStart={() => onHover(id)}
          onHoverEnd={() => onHover(null)}
          className={`
            flex items-center space-x-3 p-3 rounded-lg glass backdrop-blur-sm
            w-full transition-all duration-200
            ${isActive ? 'bg-white/20' : 'hover:bg-white/10'}
          `}
          style={{
            ...provided.draggableProps.style,
            transformOrigin: 'left center'
          }}
        >
          <span className="flex-shrink-0 p-1 rounded">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </span>
          <span className="text-white font-medium flex-1 text-left select-none">{label}</span>
        </motion.div>
      )}
    </Draggable>
  );
};

export default DraggableItem;