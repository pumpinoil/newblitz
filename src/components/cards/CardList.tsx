import React from 'react';

interface CardListProps {
  items?: { id: string; content: string }[];
}

const CardList: React.FC<CardListProps> = ({ items = [] }) => {
  const defaultItems = [
    { id: '1', content: 'First item' },
    { id: '2', content: 'Second item' },
    { id: '3', content: 'Third item' },
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <div className="space-y-2 p-4">
      {displayItems.map((item) => (
        <div key={item.id} className="p-3 glass rounded-lg">
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      ))}
    </div>
  );
};

export default CardList;