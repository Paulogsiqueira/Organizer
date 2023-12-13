import { configureStore } from '@reduxjs/toolkit';
import sliceUser from './sliceUser'

const store = configureStore({
    reducer: {
        user: sliceUser,
    },
});

export type AppDispatch = typeof store.dispatch;

export default store;