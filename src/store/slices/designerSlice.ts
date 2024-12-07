import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MagickCardProps, PageSettings } from '../../types/magickCard';

interface DesignerState {
  cards: MagickCardProps[];
  selectedCardId: string | null;
  theme: 'light' | 'dark';
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
    showHeader: true,
    showFooter: true,
    headerTitle: 'Magickal Designer',
    footerText: 'Created with ✨ magic'
  },
};

export const designerSlice = createSlice({
  name: 'designer',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<MagickCardProps>) => {
      state.cards.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },
    updateCard: (state, action: PayloadAction<{ cardId: string; updates: Partial<MagickCardProps> }>) => {
      const index = state.cards.findIndex(card => card.id === action.payload.cardId);
      if (index !== -1) {
        state.cards[index] = { ...state.cards[index], ...action.payload.updates };
      }
    },
    selectCard: (state, action: PayloadAction<string>) => {
      state.selectedCardId = action.payload;
    },
    deselectCard: (state) => {
      state.selectedCardId = null;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    updatePage: (state, action: PayloadAction<Partial<PageSettings>>) => {
      state.pageSettings = { ...state.pageSettings, ...action.payload };
    },
  },
});

export const {
  addCard,
  removeCard,
  updateCard,
  selectCard,
  deselectCard,
  toggleTheme,
  updatePage,
} = designerSlice.actions;

export default designerSlice.reducer;