import React from 'react';
import { useAppSelector } from '../store/hooks';
import { Menu } from 'lucide-react';

interface LayoutHeaderFooterProps {
  children: React.ReactNode;
  onToggleSidebar?: () => void;
}

const LayoutHeaderFooter: React.FC<LayoutHeaderFooterProps> = ({ children, onToggleSidebar }) => {
  const pageSettings = useAppSelector((state) => state.designer.pageSettings);
  const { headerTitle, footerText, showHeader, showFooter } = pageSettings;

  return (
    <div className="min-h-screen flex flex-col bg-transparent transition-colors">
      {showHeader && (
        <header className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm h-14 flex items-center px-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
              {headerTitle}
            </h1>
          </div>
        </header>
      )}

      <main className="flex-1 relative">
        <div className="h-full">
          {children}
        </div>
      </main>

      {showFooter && (
        <footer className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm h-10 flex items-center justify-center mt-auto">
          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">{footerText}</p>
        </footer>
      )}
    </div>
  );
};

export default LayoutHeaderFooter;