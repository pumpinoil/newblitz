import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MagickCardProps, PageSettings, Theme } from '../types';

interface DesignerState {
  cards: MagickCardProps[];
  selectedCardId: string | null;
  theme: Theme;
  pageSettings: PageSettings;
}

const initialState: DesignerState = {
  cards: [],
  selectedCardId: null,
  theme: 'light',
  pageSettings: {
    backgroundImage: '',
    backgroundBlur: 0,
    backgroundOpacity: 1,
    backgroundColor: '#ffffff',
  },
};

export const designerSlice = createSlice({
  name: 'designer',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<MagickCardProps>) => {
      state.cards.push(action.payload);
    },
    updateCard: (state, action: PayloadAction<Partial<MagickCardProps> & { id: string }>) => {
      const index = state.cards.findIndex(card => card.id === action.payload.id);
      if (index !== -1) {
        state.cards[index] = { ...state.cards[index], ...action.payload };
      }
    },
    selectCard: (state, action: PayloadAction<string>) => {
      state.selectedCardId = action.payload;
    },
    deselectCard: (state) => {
      state.selectedCardId = null;
    },
    updatePageSettings: (state, action: PayloadAction<Partial<PageSettings>>) => {
      state.pageSettings = { ...state.pageSettings, ...action.payload };
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { addCard, updateCard, selectCard, deselectCard, updatePageSettings, toggleTheme } = designerSlice.actions;
export default designerSlice.reducer;