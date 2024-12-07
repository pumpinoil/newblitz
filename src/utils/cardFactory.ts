// src/utils/cardFactory.ts
import { v4 as uuidv4 } from 'uuid';
import { MagickCardProps } from '../types';

export function getDefaultCardProps(componentType: string): MagickCardProps {
  let defaultContent = "<p>Edit this text</p>";
  const defaultData: Record<string, string | number> = {};

  switch (componentType) {
    case 'magickal_glass_card':
      defaultContent = "<p>✨ Magickal content goes here...</p>";
      break;
    case 'video_player_comp':
      defaultData.videoURL = "https://www.youtube.com/embed/dQw4w9WgXcQ";
      break;
    case 'article_comp':
      defaultContent = "<h1>Magickal Design Principles</h1><p>Explore foundational concepts...</p>";
      break;
    case 'fractal_canvas_comp':
      defaultData.fractalParam = 1;
      break;
    // Add other component types as needed
    default:
      break;
  }

  return {
    id: uuidv4(),
    type: componentType,
    componentType, // Ensure this is set
    content: defaultContent,
    opacity: 0.9,
    imageOpacity: 1,
    blur: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderOpacity: 0.5,
    borderColor: '#FFFFFF',
    glowEffect: false,
    glowColor: '#FFD700',
    crystalEffect: false,
    position: { x: 0, y: 0 },
    w: 4,
    h: 2,
    buttons: [],
    background: '/stylecard.jpg',
    backgroundColor: '#1F2937',
    textColor: '#FFFFFF',
    componentData: defaultData,
    padding: '10px',
    margin: '10px',
    fontSize: '16px',
    boxShadow: 'none',
    zIndex: 1,
    rotate: 0,
    skewX: 0,
    skewY: 0,
    scaleX: 1,
    scaleY: 1,
    flipX: false,
    flipY: false,
    isVisible: true,
    isLocked: false
  };
}
