// CanvasArea.tsx
import React from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateCard } from '../store/slices/designerSlice';
import { MagickCardProps } from '../types/magickCard';
import { renderCardContent } from './renderCardContent';
import GlassCard from './GlassCard';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const GridLayoutWithWidth = GridLayout.WidthProvider(GridLayout);

interface CanvasAreaProps {
  cards: MagickCardProps[];
  onCardSelect: (id: string, event?: React.MouseEvent) => void; // Make event optional
}

const CanvasArea: React.FC<CanvasAreaProps> = ({ cards, onCardSelect }) => {
  const dispatch = useAppDispatch();

  const layout: Layout[] = React.useMemo(() => cards.map((card) => ({
    i: card.id,
    x: card.position.x || 0,
    y: card.position.y || 0,
    w: card.w || 4,
    h: card.h || 2,
  })), [cards]);

  const onLayoutChange = (newLayout: Layout[]) => {
    newLayout.forEach((layoutItem) => {
      const card = cards.find(c => c.id === layoutItem.i);
      if (card) {
        dispatch(updateCard({
          cardId: card.id,
          updates: { 
            position: { x: layoutItem.x, y: layoutItem.y },
            w: layoutItem.w,
            h: layoutItem.h
          }
        }));
      }
    });
  };

  return (
    <div className="canvas-grid h-screen w-full relative overflow-hidden">
      <GridLayoutWithWidth
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        margin={[20, 20]}
        containerPadding={[20, 20]}
        isResizable={true}
        isDraggable={true}
        useCSSTransforms={true}
        compactType={null}
        preventCollision={false}
        draggableHandle=".cursor-grab"
        onResizeStop={(layout, oldItem, newItem) => {
          dispatch(updateCard({
            cardId: newItem.i,
            updates: { 
              w: newItem.w, 
              h: newItem.h,
              position: { x: newItem.x, y: newItem.y }
            }
          }));
        }}
        onDragStop={(layout, oldItem, newItem) => {
          dispatch(updateCard({
            cardId: newItem.i,
            updates: { position: { x: newItem.x, y: newItem.y } }
          }));
        }}
        onLayoutChange={onLayoutChange}
      >
        {cards.map((card, index) => (
          <div key={card.id} className="h-full cursor-grab active:cursor-grabbing group">
            <GlassCard
              id={card.id}
              index={index} // Provide the index here
              label={card.type}
              card={card}
              onSettingsClick={() => onCardSelect(card.id)}
            >
              {renderCardContent(card)}
            </GlassCard>
          </div>
        ))}
      </GridLayoutWithWidth>
    </div>
  );
};

export default CanvasArea;
