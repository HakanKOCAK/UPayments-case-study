import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import modalReducer from './modal';
import productReducer from './products';
import categoryReducer from './categories';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    products: productReducer,
    categories: categoryReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
