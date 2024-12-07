// src/components/Designer.tsx
import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addCard, selectCard, deselectCard } from '../store/slices/designerSlice';
import { getDefaultCardProps } from '../utils/cardFactory';
import Sidebar from '../components/Sidebar';
import CanvasArea from '../components/CanvasArea';
import LayoutHeaderFooter from '../components/LayoutHeaderFooter';
import CustomizationPanel from '../components/CustomizationPanel';
import PageCustomizationPanel from '../components/PageCustomizationPanel';
import Modal from '../components/Modal';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const Designer: React.FC = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.designer.cards);
  const selectedCardId = useAppSelector((state) => state.designer.selectedCardId);

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showPageSettings, setShowPageSettings] = useState(false);

  useEffect(() => {
    const handler = () => {
      setShowPageSettings(true);
    };
    window.addEventListener('openPageCustomization', handler);
    return () => window.removeEventListener('openPageCustomization', handler);
  }, []);

  const handleCardSelect = (id: string) => {
    dispatch(selectCard(id));
  };

  const handleCloseModal = () => {
    dispatch(deselectCard());
    setShowPageSettings(false);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    // Dragging from sidebar to canvas
    if (source.droppableId === 'sidebar' && destination.droppableId === 'canvas') {
      const componentType = draggableId; // Assuming draggableId corresponds to componentType
      const cardProps = getDefaultCardProps(componentType);

      // Calculate grid position based on destination index
      const gridX = destination.index % 12; // Assuming 12 columns
      const gridY = Math.floor(destination.index / 12);
      cardProps.position = {
        x: gridX,
        y: gridY
      };
      cardProps.w = 4;
      cardProps.h = 2;

      dispatch(addCard(cardProps));
    }
    // Handle other drag scenarios if necessary
  };

  return (
    <LayoutHeaderFooter onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="relative h-screen flex overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[300px]' : 'ml-0'}`}>
            <CanvasArea 
              cards={cards} 
              onCardSelect={handleCardSelect} // Ensure it matches the expected signature
            />
          </div>
        </div>
      </DragDropContext>
      <Modal isOpen={selectedCardId !== null || showPageSettings} onClose={handleCloseModal}>
        {showPageSettings ? (
          <PageCustomizationPanel onClose={handleCloseModal} />
        ) : selectedCardId ? (
          <CustomizationPanel cardId={selectedCardId} onClose={handleCloseModal} />
        ) : null}
      </Modal>
    </LayoutHeaderFooter>
  );
};

export default Designer;
