import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    reviews: [],
    status: 'idle',
    error: null,
};

export const fetchReviews = createAsyncThunk('review/fetchReviews', async (userId) => {
    try {
        const response = await fetch(`https://localhost:7189/api/Review/getUserReviews/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        return data["$values"];
    } catch (error) {
        throw error;
    }
});

export const createReview = createAsyncThunk('review/createReview', async ({ rating, text, postedBy, user }) => {
    try {
        const accessToken = Cookies.get('accessToken');

        const response = await fetch(`https://localhost:7189/api/Review/createReview/${user.id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating, text, postedBy }),
        });

        if (!response.ok) {
            throw new Error('Failed to create review');
        }

        const data = await response.json();

        console.log("data rev");
        console.log(data);

        return data;
    } catch (error) {
        throw error;
    }
});


export const deleteReview = createAsyncThunk('review/deleteReview', async (reviewId) => {
    try {
        const accessToken = Cookies.get('accessToken');

        const response = await fetch(`https://localhost:7189/api/Review/deleteReview/${reviewId}`, {
            headers: {

                'Authorization': `Bearer ${accessToken}`
            },
            method: 'DELETE'

        });
        if (!response.ok) {
            throw new Error('Failed to delete review');
        }

        return response.ok;
    } catch (error) {
        throw error;
    }
});

const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        reviews: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addReview: (state, action) => {
            state.reviews.push(action.payload);
        },
        removeReview: (state, action) => {
            state.reviews = state.reviews.filter(review => review.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.reviews.push(action.payload);
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.reviews = state.reviews.filter(review => review.id !== action.payload);
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { addReview, removeReview } = reviewSlice.actions;

export const selectReviews = (state) => state.review.reviews;

export const selectReviewsStatus = (state) => state.review.status;

export const selectReviewsError = (state) => state.review.error;

export default reviewSlice.reducer;