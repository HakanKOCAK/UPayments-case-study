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
  //Since I am passing a function to modal reducer and functions are not serializable it gives an error to console
  //So I will set serializableCheck to false. However, !IT IS NOT RECOMMENDED TO DO THIS!.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
