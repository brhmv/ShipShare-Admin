import { configureStore } from '@reduxjs/toolkit';
import AdminSlice from './AdminSlice';
import AuthSlice from './AuthSlice';

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        admin: AdminSlice
    },
});

export default store;