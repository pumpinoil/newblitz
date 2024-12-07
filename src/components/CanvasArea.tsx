import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import GridLayout from 'react-grid-layout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateCard } from '../store/slices/designerSlice';
import { MagickCardProps } from '../types/magickCard';
import { motion } from 'framer-motion';
import { renderCardContent } from './renderCardContent';
import GlassCard from './GlassCard';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const GridLayoutWithWidth = GridLayout.WidthProvider(GridLayout);

interface CanvasAreaProps {
  cards: MagickCardProps[];
  onCardSelect: (id: string) => void;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({ cards, onCardSelect }) => {
  const dispatch = useAppDispatch();
  
  const layout = React.useMemo(() => cards.map((card) => ({
    i: card.id,
    x: card.position.x || 0,
    y: card.position.y || 0,
    w: 4,
    h: 2,
  })), [cards]);

  return (
    <Droppable droppableId="canvas" type="CARD">
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="h-screen w-full relative overflow-hidden"
          style={{
            backgroundColor: snapshot.isDraggingOver ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
            transition: 'background-color 0.2s ease'
          }}
          transition={{ duration: 0.2 }}
        >
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
            preventCollision={true}
            draggableCancel=".card-settings-trigger"
            onResizeStop={(layout, oldItem, newItem) => {
              const card = cards.find(c => c.id === newItem.i);
              if (card) {
                dispatch(updateCard({
                  cardId: card.id,
                  updates: { w: newItem.w, h: newItem.h }
                }));
              }
            }}
            onDragStop={(layout, oldItem, newItem) => {
              const card = cards.find(c => c.id === newItem.i);
              if (card) {
                dispatch(updateCard({
                  cardId: card.id,
                  updates: { position: { x: newItem.x, y: newItem.y } }
                }));
              }
            }}
          >
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="h-full cursor-grab active:cursor-grabbing group"
              >
                <GlassCard
                  id={card.id}
                  index={index}
                  label={card.type}
                  card={card}
                  onSettingsClick={() => onCardSelect(card.id)}
                >
                  {renderCardContent(card)}
                </GlassCard>
              </div>
            ))}
          </GridLayoutWithWidth>
          {provided.placeholder}
        </motion.div>
      )}
    </Droppable>
  );
};

export default CanvasArea;