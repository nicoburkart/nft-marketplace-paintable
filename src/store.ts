import { configureStore } from '@reduxjs/toolkit';
import { accountSlice } from 'core/redux/accountSlice';
import { artworkSlice } from 'core/redux/artworkSlice';

// ...

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    artwork: artworkSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {account: AccountState}
export type AppDispatch = typeof store.dispatch;
