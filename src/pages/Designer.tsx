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
  }, [dispatch]);

  const handleCardSelect = (id: string) => {
    dispatch(selectCard(id));
  };

  const handleCloseModal = () => {
    dispatch(deselectCard());
    setShowPageSettings(false);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || !result.destination) return;

    if (source.droppableId === 'sidebar' && destination.droppableId === 'canvas') {
      const cardProps = getDefaultCardProps(draggableId);
      cardProps.position = {
        x: Math.max(0, destination.index * 50),
        y: Math.max(0, destination.index * 50)
      };
      cardProps.w = 200;
      cardProps.h = 100;
      dispatch(addCard(cardProps));
    }
  };

  return (
    <LayoutHeaderFooter onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="relative h-screen flex overflow-hidden">
          <div className={`fixed inset-y-0 left-0 z-30 transition-transform duration-300 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-[300px]'
          }`}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
          </div>

          <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[300px]' : 'ml-0'}`}>
            <CanvasArea 
              cards={cards} 
              onCardSelect={(id: string, event: React.MouseEvent) => {
                // Only show customization if clicking the settings icon
                if ((event.target as HTMLElement).closest('.card-settings-trigger')) {
                  handleCardSelect(id);
                }
              }} 
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