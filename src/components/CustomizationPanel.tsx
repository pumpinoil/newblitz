import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateCard } from '../store/designerSlice';
import { SketchPicker } from 'react-color';
import { X } from 'lucide-react';

interface CustomizationPanelProps {
  cardId: string;
  onClose: () => void;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ cardId, onClose }) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector(state => 
    state.designer.cards.find(c => c.id === cardId)
  );

  if (!card) return null;

  return (
    <div className="h-full overflow-y-auto">
      <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Customize {card.type}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Settings */}
        <div className="space-y-4">
          <h3 className="text-md font-semibold">Basic Settings</h3>
          
          <div className="space-y-2">
            <label className="block text-sm">Opacity</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={card.opacity}
              onChange={(e) => dispatch(updateCard({ id: cardId, opacity: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Background Color</label>
            <SketchPicker
              color={card.backgroundColor || '#1F2937'}
              onChange={(color) => dispatch(updateCard({ 
                cardId, 
                updates: { backgroundColor: color.hex } 
              }))}
            />
          </div>
        </div>

        {/* Border Settings */}
        <div className="space-y-4">
          <h3 className="text-md font-semibold">Border</h3>
          
          <div className="space-y-2">
            <label className="block text-sm">Border Radius</label>
            <input
              type="range"
              min="0"
              max="50"
              value={card.borderRadius}
              onChange={(e) => dispatch(updateCard({ id: cardId, borderRadius: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Border Width</label>
            <input
              type="range"
              min="0"
              max="10"
              value={card.borderWidth}
              onChange={(e) => dispatch(updateCard({ id: cardId, borderWidth: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Border Color</label>
            <SketchPicker
              color={card.borderColor || '#FFFFFF'}
              onChange={(color) => dispatch(updateCard({ 
                cardId, 
                updates: { borderColor: color.hex } 
              }))}
            />
          </div>
        </div>

        {/* Effects */}
        <div className="space-y-4">
          <h3 className="text-md font-semibold">Effects</h3>
          
          <div className="space-y-2">
            <label className="block text-sm">Blur Effect</label>
            <input
              type="range"
              min="0"
              max="20"
              value={card.blur}
              onChange={(e) => dispatch(updateCard({ id: cardId, blur: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={card.glowEffect}
              onChange={(e) => dispatch(updateCard({ id: cardId, glowEffect: e.target.checked }))}
              className="rounded"
            />
            <label className="text-sm">Enable Glow Effect</label>
          </div>

          {card.glowEffect && (
            <div className="space-y-2">
              <label className="block text-sm">Glow Color</label>
              <SketchPicker
                color={card.glowColor || '#FFD700'}
                onChange={(color) => dispatch(updateCard({ 
                  cardId, 
                  updates: { glowColor: color.hex } 
                }))}
              />
            </div>
          )}
        </div>

        {/* Size and Position */}
        <div className="space-y-4">
          <h3 className="text-md font-semibold">Size and Position</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm">Width</label>
              <input
                type="number"
                value={card.w}
                onChange={(e) => dispatch(updateCard({ id: cardId, w: parseInt(e.target.value) }))}
                className="w-full rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm">Height</label>
              <input
                type="number"
                value={card.h}
                onChange={(e) => dispatch(updateCard({ id: cardId, h: parseInt(e.target.value) }))}
                className="w-full rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;