import React from 'react';
import { MagickCardProps } from '../types/magickCard';
import * as Cards from './cards';

const componentMap = {
  article_comp: Cards.Article,
  animated_card_comp: Cards.AnimatedCard,
  card_list_comp: Cards.CardList,
  dashboard_comp: Cards.Dashboard,
  form_comp: Cards.Form,
  fancy_button_comp: Cards.FancyButton,
  fractal_canvas_comp: Cards.FractalCanvas,
  grid_layout_comp: Cards.GridLayout,
  icon_with_tooltip_comp: Cards.IconWithTooltip,
  interactive_image_comp: Cards.InteractiveImage,
  layout_comp: Cards.Layout,
  magick_card_3d_comp: Cards.MagickCard3D,
  video_player_comp: Cards.VideoPlayer,
};

export function renderCardContent(card: MagickCardProps) {
  const Component = componentMap[card.componentType as keyof typeof componentMap];
  
  if (!Component) {
    return <div className="prose prose-invert p-2" dangerouslySetInnerHTML={{ __html: card.content }} />;
  }

  const props = {
    ...card.componentData,
    content: card.content,
  };

  return <Component {...props} />;
}