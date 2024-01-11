import { configureStore } from '@reduxjs/toolkit';
import sliceUserReducer from './sliceUser';
import { persistReducer } from 'redux-persist';
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

  store.subscribe(() => {
    console.log('State after dispatch:', store.getState());
  });
  
  export type RootState = ReturnType<typeof store.getState>; 
  
  export type AppDispatch = typeof store.dispatch;
  export const persistor = persistStore(store);

  export default store;