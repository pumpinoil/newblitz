import React from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

const presetColors = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#808080', '#800000',
  '#808000', '#008000', '#800080', '#008080', '#000080',
];

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, label }) => {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded overflow-hidden cursor-pointer"
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-transparent w-24"
        />
      </div>
      <div className="grid grid-cols-5 gap-2 mt-2">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            onClick={() => onChange(presetColor)}
            className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer hover:scale-110 transition-transform"
            style={{ backgroundColor: presetColor }}
            aria-label={`Select color ${presetColor}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;