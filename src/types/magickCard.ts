export interface CardProps {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  componentType: string;
}

export interface MagickCardProps extends CardProps {
  content: string;
  opacity: number;
  imageOpacity: number;
  blur: number;
  borderRadius: number;
  borderWidth: number;
  borderOpacity: number;
  borderColor: string;
  glowEffect: boolean;
  glowColor: string;
  crystalEffect: boolean;
  w: number;
  h: number;
  buttons: any[];
  background: string;
  backgroundColor: string;
  textColor: string;
  componentData: Record<string, any>;
  padding?: string;
  margin?: string;
  fontSize?: string;
  boxShadow?: string;
  zIndex?: number;
  rotate?: number;
  skewX?: number;
  skewY?: number;
  scaleX?: number;
  scaleY?: number;
  flipX?: boolean;
  flipY?: boolean;
  isVisible?: boolean;
  isLocked?: boolean;
}

export interface PageSettings {
  backgroundImage: string;
  backgroundBlur: number;
  backgroundOpacity: number;
  backgroundColor: string;
  showHeader: boolean;
  showFooter: boolean;
  headerTitle: string;
  footerText: string;
}

export type Theme = 'light' | 'dark';