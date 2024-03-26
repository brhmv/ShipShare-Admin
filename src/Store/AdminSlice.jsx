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
        // console.log("Sender all posts")
        // console.log(data["$values"]);
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
        // console.log("Reviews:")
        // console.log(data["$values"]);
        return data["$values"];

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
    },
});

export default adminSlice.reducer;