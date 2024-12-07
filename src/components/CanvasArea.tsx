// src/components/CanvasArea.tsx

import React from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import { Droppable } from '@hello-pangea/dnd';
import { useAppDispatch } from '../store/hooks';
import { updateCard } from '../store/slices/designerSlice';
import { MagickCardProps } from '../types';
import { renderCardContent } from './renderCardContent';
import GlassCard from './GlassCard';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface CanvasAreaProps {
  cards: MagickCardProps[];
  onCardSelect: (id: string) => void;
  activeDragItem: MagickCardProps | null;
  dragPosition: { x: number; y: number } | null;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({
  cards,
  onCardSelect,
  activeDragItem,
  dragPosition,
}) => {
  const dispatch = useAppDispatch();

  const layout: Layout[] = React.useMemo(
    () =>
      cards.map((card) => ({
        i: card.id,
        x: card.position.x || 0,
        y: card.position.y || 0,
        w: card.w || 4,
        h: card.h || 2,
      })),
    [cards]
  );

  const onLayoutChange = (newLayout: Layout[]) => {
    newLayout.forEach((layoutItem) => {
      const card = cards.find((c) => c.id === layoutItem.i);
      if (card) {
        dispatch(
          updateCard({
            cardId: card.id,
            updates: {
              position: { x: layoutItem.x, y: layoutItem.y },
              w: layoutItem.w,
              h: layoutItem.h,
            },
          })
        );
      }
    });
  };

  return (
    <Droppable droppableId="canvas" type="CARD">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`
            canvas-grid h-screen w-full relative overflow-hidden
            transition-colors duration-300
            ${
              snapshot.isDraggingOver
                ? 'bg-indigo-100'
                : 'bg-gray-900'
            }
          `}
          style={{
            backgroundImage: snapshot.isDraggingOver
              ? 'url(/grid-bg.png)' // Replace with your grid background image path
              : 'none',
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat',
          }}
        >
          <GridLayout
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
              dispatch(
                updateCard({
                  cardId: newItem.i,
                  updates: {
                    w: newItem.w,
                    h: newItem.h,
                    position: { x: newItem.x, y: newItem.y },
                  },
                })
              );
            }}
            onDragStop={(layout, oldItem, newItem) => {
              dispatch(
                updateCard({
                  cardId: newItem.i,
                  updates: { position: { x: newItem.x, y: newItem.y } },
                })
              );
            }}
            onLayoutChange={onLayoutChange}
          >
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="h-full cursor-grab active:cursor-grabbing group"
              >
                <GlassCard
                  index={index}
                  label={card.type}
                  card={card}
                  onSettingsClick={() => onCardSelect(card.id)}
                >
                  {renderCardContent(card)}
                </GlassCard>
              </div>
            ))}
            {provided.placeholder}
          </GridLayout>

          {/* Render Ghost Card */}
          {snapshot.isDraggingOver && activeDragItem && dragPosition && (
            <div
              className="absolute pointer-events-none"
              style={{
                top: dragPosition.y,
                left: dragPosition.x,
                transform: 'translate(-50%, -50%)',
                opacity: 0.5,
              }}
            >
              <GlassCard
                index={0} // Index is irrelevant here
                label={activeDragItem.type}
                card={activeDragItem}
                onSettingsClick={() => {}} // No action needed for overlay
              >
                {activeDragItem.content}
              </GlassCard>
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default CanvasArea;
