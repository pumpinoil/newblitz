import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { updateCard } from '../store/slices/designerSlice';
import { Settings, Type, Palette, Move, Trash } from 'lucide-react';
import ColorPicker from './ui/ColorPicker';

interface CardToolbarProps {
  cardId: string;
  position: { x: number; y: number };
  onDelete: () => void;
}

const CardToolbar: React.FC<CardToolbarProps> = ({ cardId, position, onDelete }) => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = React.useState<'style' | 'text' | null>(null);

  return (
    <div 
      className="absolute z-50 glass dark:glass-dark backdrop-blur-md shadow-lg rounded-lg p-2 flex gap-2"
      style={{ 
        top: position.y - 50,
        left: position.x,
      }}
    >
      <button
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        onClick={() => setActiveTab(activeTab === 'style' ? null : 'style')}
        title="Style settings"
      >
        <Palette className="w-4 h-4" />
      </button>
      
      <button
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        onClick={() => setActiveTab(activeTab === 'text' ? null : 'text')}
        title="Text settings"
      >
        <Type className="w-4 h-4" />
      </button>

      <button
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        onClick={onDelete}
        title="Delete card"
      >
        <Trash className="w-4 h-4" />
      </button>

      {activeTab === 'style' && (
        <div className="absolute top-full left-0 mt-2 p-4 glass dark:glass-dark backdrop-blur-md rounded-lg">
          <ColorPicker
            label="Background"
            color="#ffffff"
            onChange={(color) => dispatch(updateCard({ 
              cardId, 
              updates: { backgroundColor: color } 
            }))}
          />
        </div>
      )}

      {activeTab === 'text' && (
        <div className="absolute top-full left-0 mt-2 p-4 glass dark:glass-dark backdrop-blur-md rounded-lg">
          <div className="space-y-2">
            <button className="p-1 hover:bg-white/10 rounded">
              <Type className="w-4 h-4" />
            </button>
            <input
              type="range"
              min="12"
              max="32"
              className="w-full"
              onChange={(e) => dispatch(updateCard({
                cardId,
                updates: { fontSize: `${e.target.value}px` }
              }))}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardToolbar;