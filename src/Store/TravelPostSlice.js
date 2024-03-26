import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';


export const getTravellerPosts = createAsyncThunk('post/getAllTravellerPosts', async () => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch("https://localhost:7189/api/Admin/getAllSenderPosts", {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response data:", data); // Log response data
        return data["$values"];
    } catch (error) {
        console.error("Error fetching traveller posts:", error);
        throw error;
    }
});


export const addPostAsync = createAsyncThunk('post/createTraveler', async ({ postData, setTemp }) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch("https://localhost:7189/api/TravellerPost/createTravellerPost", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error('Failed to add post');
        }

        const data = await response.json();

        setTemp(true);

        return data;
    } catch (error) {
        throw error;
    }
});

export const editPostAsync = createAsyncThunk('post/editPostAsync', async ({ id, newData }) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`${"https://localhost:7189/api/TravellerPosts/updateTravellerPost"}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(newData),
        });
        if (!response.ok) {
            throw new Error('Failed to edit post!');
        }
        const data = await response.json();
        return { id, newData: data };
    } catch (error) {
        throw error;
    }
});

export const deletePostAsync = createAsyncThunk('post/deletePostAsync', async (postId) => {
    try {
        const response = await fetch(`${"API_URL"}/${postId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete post');
        }
        return postId;
    } catch (error) {
        throw error;
    }
});

const postSlice = createSlice({
    name: 'travelPost',
    initialState: {
        posts: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        editPost: (state, action) => {
            const { id, newData } = action.payload;
            const postIndex = state.posts.findIndex(post => post.id === id);
            if (postIndex !== -1) {
                state.posts[postIndex] = { ...state.posts[postIndex], ...newData };
            }
        },
        deletePost: (state, action) => {
            const postId = action.payload;
            state.posts = state.posts.filter(post => post.id !== postId);
        },
        getTravellerPost: (state, action) => {
            state.posts = action.payload;
        },
        getAllPosts: (state, action) => {
            state.posts = action.payload;
        },

    },

    extraReducers: (builder) => {
        builder
            .addCase(getTravellerPosts.fulfilled, (state, action) => {
                state.status = 'idle';
                state.posts = action.payload;
            })

            .addCase(getTravellerPosts.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(getTravellerPosts.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.error.message;
            })

            .addCase(addPostAsync.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(editPostAsync.fulfilled, (state, action) => {
                const { id, newData } = action.payload;
                const index = state.posts.findIndex(post => post.id === id);
                if (index !== -1) {
                    state.posts[index] = { ...state.posts[index], ...newData };
                }
            })
            .addCase(deletePostAsync.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            });
    },
});

export const { addPost, editPost, deletePost, getTravellerPost, getAllPosts } = postSlice.actions;

export default postSlice.reducer;