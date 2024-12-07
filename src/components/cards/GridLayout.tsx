
import React from 'react';

const GridLayout: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {/* Grid items */}
      <div className="bg-white p-4 rounded shadow">Item 1</div>
      <div className="bg-white p-4 rounded shadow">Item 2</div>
      {/* Add more items as needed */}
    </div>
  );
};

export default GridLayout;
