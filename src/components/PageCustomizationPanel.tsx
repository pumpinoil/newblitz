import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updatePage } from '../store/slices/designerSlice';
import { X } from 'lucide-react';
import ColorPicker from './ui/ColorPicker';

interface PageCustomizationPanelProps {
  onClose: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-md font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">{title}</h3>
    {children}
  </div>
);

const PageCustomizationPanel: React.FC<PageCustomizationPanelProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const pageSettings = useAppSelector(state => state.designer.pageSettings);

  return (
    <div className="h-full overflow-y-auto px-6 py-4">
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-white dark:bg-gray-800 z-10">
        <h2 className="text-lg font-bold">Page Settings</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close settings"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <Section title="Layout">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={pageSettings.showHeader}
                onChange={(e) => dispatch(updatePage({ showHeader: e.target.checked }))}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span>Show Header</span>
            </label>
            
            {pageSettings.showHeader && (
              <input
                type="text"
                value={pageSettings.headerTitle}
                onChange={(e) => dispatch(updatePage({ headerTitle: e.target.value }))}
                className="ml-4 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-transparent"
                placeholder="Header Title"
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={pageSettings.showFooter}
                onChange={(e) => dispatch(updatePage({ showFooter: e.target.checked }))}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span>Show Footer</span>
            </label>
            
            {pageSettings.showFooter && (
              <input
                type="text"
                value={pageSettings.footerText}
                onChange={(e) => dispatch(updatePage({ footerText: e.target.value }))}
                className="ml-4 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-transparent"
                placeholder="Footer Text"
              />
            )}
          </div>
        </Section>

        <Section title="Background">
          <div className="space-y-2">
            <ColorPicker
              label="Background Color"
              color={pageSettings.backgroundColor}
              onChange={(color) => dispatch(updatePage({ backgroundColor: color }))}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Background Opacity</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={pageSettings.backgroundOpacity}
              onChange={(e) => dispatch(updatePage({ backgroundOpacity: parseFloat(e.target.value) }))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Background Blur</label>
            <input
              type="range"
              min="0"
              max="20"
              value={pageSettings.backgroundBlur}
              onChange={(e) => dispatch(updatePage({ backgroundBlur: parseInt(e.target.value) }))}
              className="w-full accent-indigo-600"
            />
          </div>
        </Section>
      </div>
    </div>
  );
};

export default PageCustomizationPanel;