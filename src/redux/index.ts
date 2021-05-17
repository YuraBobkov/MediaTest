import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createMiddleware } from '@routo/redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

import router from 'src/router';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware<RootState>(),
    createMiddleware<RootState>(router),
  ],
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
