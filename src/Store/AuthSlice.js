import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const signIn = createAsyncThunk('auth/signIn',
    async ({ email, password }) => {
        try {
            const response = await fetch("https://localhost:7189/api/auth/signIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: Cookies.get("accessToken") ? true : false,
        accessToken: null,
        error: null,
    },
    reducers: {
        signOut: (state) => {
            state.isAuthenticated = false;
            Cookies.remove("accessToken");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.accessToken = action.payload.accessToken;
                state.error = null;
                Cookies.set("accessToken", action.payload.accessToken);
            })
            .addCase(signIn.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;