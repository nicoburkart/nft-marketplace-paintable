import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// Define a type for the slice state
interface ArtworkState {
  title: string;
  description: string;
  price: number;
  artStyle: string;
  publicUrl: string;
  tokenAmount: number;
  availableTokens: number;
  creator: string;
}

// Define the initial state using that type
const initialState: ArtworkState = {
  title: '',
  description: '',
  price: 0,
  artStyle: '',
  publicUrl: '',
  tokenAmount: 0,
  availableTokens: 0,
  creator: '',
};

export const artworkSlice = createSlice({
  name: 'artwork',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = artworkSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectArtwork = (state: RootState) => state.artwork;

export default artworkSlice.reducer;
