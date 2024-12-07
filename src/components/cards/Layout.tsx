import React from 'react';

interface LayoutProps {
  children?: React.ReactNode;
  columns?: number;
}

const Layout: React.FC<LayoutProps> = ({ children, columns = 2 }) => {
  return (
    <div
      className="grid gap-4 p-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`
      }}
    >
      {children || (
        <>
          <div className="glass p-4 rounded-lg">Section 1</div>
          <div className="glass p-4 rounded-lg">Section 2</div>
        </>
      )}
    </div>
  );
};

export default Layout;