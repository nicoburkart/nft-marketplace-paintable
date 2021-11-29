import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// Define a type for the slice state
interface AccountState {
  name: string;
  publicAddress: string;
}

// Define the initial state using that type
const initialState: AccountState = {
  name: '',
  publicAddress: '',
};

export const accountSlice = createSlice({
  name: 'account',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAccountPublicAddress: (state, action: PayloadAction<string>) => {
      state.publicAddress = action.payload;
    },
    setAccountName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    resetAccount: (state) => {
      state.name = state.publicAddress = initialState.publicAddress;
    },
  },
});

export const { setAccountPublicAddress, setAccountName, resetAccount } =
  accountSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAccount = (state: RootState) => state.account.publicAddress;

export default accountSlice.reducer;
