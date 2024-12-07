// src/components/Sidebar.tsx
import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import DraggableItem from './DraggableItem';
import ThemeToggle from './ThemeToggle';
import { X, Settings, Sparkles } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [activeItemId, setActiveItemId] = React.useState<string | null>(null);
  
  // Static list of components
  const items = [
    { id: 'magickal_glass_card', label: 'Magickal Glass Card' },
    // Add more items here if needed
  ];

  return (
    <motion.aside
      className={`
        fixed top-0 left-0 w-[300px] h-full z-50
        glass glass-dark backdrop-blur-xl
        text-white flex flex-col p-4 overflow-hidden bg-gradient-to-br
        from-purple-900/30 via-pink-900/30 to-blue-900/30
      `}
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      <header className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-indigo-400" />
          <h1 className="text-2xl font-bold">Components</h1>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="mb-4">
          <button
            className="w-full flex items-center space-x-2 p-2 rounded-md glass hover:bg-white/20 cursor-pointer transition-colors"
            onClick={() => {
              const event = new CustomEvent('openPageCustomization');
              window.dispatchEvent(event);
            }}
          >
            <Settings className="w-5 h-5" />
            <span className="text-white ml-2">Page Settings</span>
          </button>
        </div>

        {/* Droppable with isDropDisabled to prevent dropping back into the sidebar */}
        <Droppable droppableId="sidebar" type="CARD" isDropDisabled={true}>
          {(provided) => (
            <div 
              ref={provided.innerRef} 
              {...provided.droppableProps} 
              className="flex-1 space-y-2 overflow-y-auto scrollbar-hidden pb-4"
            >
              {items.map((item, index) => (
                <DraggableItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  label={item.label}
                  isActive={activeItemId === item.id}
                  onHover={setActiveItemId}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
