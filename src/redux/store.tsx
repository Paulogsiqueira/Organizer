import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import sliceUserReducer from './sliceUser';
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
    key: 'root',
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, sliceUserReducer);
  
  const store = configureStore({
    reducer: {
      user: persistedReducer
    },
  });

  export type RootState = ReturnType<typeof store.getState>; 
  
  export type AppDispatch = typeof store.dispatch;
  export const persistor = persistStore(store);

  export default store;