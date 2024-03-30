import { configureStore } from '@reduxjs/toolkit';
import AdminSlice from './AdminSlice';
import AuthSlice from './AuthSlice';
import TravelPostSlice from './TravelPostSlice';
import SenderPostSlice from './SenderPostSlice';
import ReviewSlice from './ReviewSlice';

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        admin: AdminSlice,
        travelPost: TravelPostSlice,
        senderPost: SenderPostSlice,
        review: ReviewSlice
    },
});

export default store;