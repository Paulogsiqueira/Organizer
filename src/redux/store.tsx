import { configureStore } from '@reduxjs/toolkit';
import sliceUser from './sliceUser'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
  };
  
  const persistedReducer = persistReducer(persistConfig, sliceUser);
  
  const store = configureStore({
    reducer: {
      user: persistedReducer
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>; 
  
  export type AppDispatch = typeof store.dispatch;
  
  export default store;