import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';


export const getAllTravellerPosts = createAsyncThunk('admin/getAllTravellerPosts', async () => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch("https://localhost:7189/api/Admin/getAllTravellerPosts", {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',

            },
            method: 'GET',
        });

        const data = await response.json();
        return data["$values"];

    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getAllSenderPosts = createAsyncThunk('post/getAllSenderPosts', async () => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch("https://localhost:7189/api/Admin/getAllSenderPosts", {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',

            },
            method: 'GET',
        });

        const data = await response.json();
        return data["$values"];

    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getAllReviews = createAsyncThunk('post/getAllReviews', async () => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch("https://localhost:7189/api/Admin/getAllReviews", {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',

            },
            method: 'GET',
        });

        const data = await response.json();
        return data["$values"];

    } catch (error) {
        console.log(error);
        throw error;
    }
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////

export const setSenderStatus = createAsyncThunk('post/setSenderStatus', async ({ postId, status }) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`https://localhost:7189/api/Admin/setStatusSenderPost/${postId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            method: 'Put',
            body: JSON.stringify(status),
        });

        if (!response.ok) {
            throw new Error('Failed to edit post!');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const setTravellerStatus = createAsyncThunk('post/setTravellerStatus', async ({ postId, status }) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`https://localhost:7189/api/Admin/setStatusTravellerPost/${postId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            method: 'Put',
            body: JSON.stringify(status),
        });

        if (!response.ok) {
            throw new Error('Failed to edit post!');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});


export const setReviewStatus = createAsyncThunk('post/setReviewStatus', async ({ reviewId, status }) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`https://localhost:7189/api/Admin/setStatusReview/${reviewId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            method: 'Put',
            body: JSON.stringify(status),
        });

        if (!response.ok) {
            throw new Error('Failed to edit post!');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});




const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        allSenderPosts: [],
        allTravellerPosts: [],
        allReviews: [],

        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTravellerPosts.fulfilled, (state, action) => {
                state.status = 'idle';
                state.allTravellerPosts = action.payload;
            })
            .addCase(getAllSenderPosts.fulfilled, (state, action) => {
                state.status = 'idle';
                state.allSenderPosts = action.payload;
            })
            .addCase(getAllReviews.fulfilled, (state, action) => {
                state.status = 'idle';
                state.allReviews = action.payload;
            })

            .addCase(getAllTravellerPosts.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.error.message;
            })
            .addCase(getAllSenderPosts.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.error.message;
            })
            .addCase(getAllReviews.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.error.message;
            })
        ////////////////////////////////////////////////////////////////////
        // .addCase(deleteReview.fulfilled, (state, action) => {
        //     state.allReviews = state.allReviews.filter(review => review.id !== action.payload.reviewId);
        // })

        // .addCase(setReviewStatus.fulfilled, (state, action) => {
        //     // Update the review status in the state
        //     const updatedReviews = state.allReviews.map(review => {
        //         if (review.id === action.payload.reviewId) {
        //             return { ...review, isConfirmed: true }; // Assuming your review object has an id and isConfirmed property
        //         }
        //         return review;
        //     });
        //     state.allReviews = updatedReviews;
        // })
    },
});

export default adminSlice.reducer;