// src/store/actions.ts

import { ADD_CARD, REMOVE_CARD, UPDATE_CARD, SELECT_CARD, DESELECT_CARD, TOGGLE_THEME, UPDATE_PAGE } from './actionTypes';
import { MagickCardProps, PageSettings } from '../types/magickCard';

export interface AddCardAction {
  type: typeof ADD_CARD;
  payload: MagickCardProps;
}

export interface RemoveCardAction {
  type: typeof REMOVE_CARD;
  payload: string;
}

export interface UpdateCardAction {
  type: typeof UPDATE_CARD;
  payload: {
    cardId: string;
    updates: Partial<MagickCardProps>;
  };
}

export interface SelectCardAction {
  type: typeof SELECT_CARD;
  payload: string;
}

export interface DeselectCardAction {
  type: typeof DESELECT_CARD;
}

export interface ToggleThemeAction {
  type: typeof TOGGLE_THEME;
}

export interface UpdatePageAction {
  type: typeof UPDATE_PAGE;
  payload: Partial<PageSettings>;
}

export type MagickActionTypes =
  | AddCardAction
  | RemoveCardAction
  | UpdateCardAction
  | SelectCardAction
  | DeselectCardAction
  | ToggleThemeAction
  | UpdatePageAction;

export const addCard = (card: MagickCardProps): AddCardAction => ({
  type: ADD_CARD,
  payload: card,
});

export const removeCard = (id: string): RemoveCardAction => ({
  type: REMOVE_CARD,
  payload: id,
});

export const updateCard = (cardId: string, updates: Partial<MagickCardProps>): UpdateCardAction => ({
  type: UPDATE_CARD,
  payload: { cardId, updates },
});

export const selectCard = (id: string): SelectCardAction => ({
  type: SELECT_CARD,
  payload: id,
});

export const deselectCard = (): DeselectCardAction => ({
  type: DESELECT_CARD,
});

export const toggleTheme = (): ToggleThemeAction => ({
  type: TOGGLE_THEME,
});

export const updatePage = (updates: Partial<PageSettings>): UpdatePageAction => ({
  type: UPDATE_PAGE,
  payload: updates,
});
