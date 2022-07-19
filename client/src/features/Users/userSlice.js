import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    user: null,
    success: true,
    message: "",
};


export const getUser = createAsyncThunk("users/fetchUserData", () => {
    return axios
        .get("/api/login")
        .then(response => {
            const { user } = response.data;
            return user;
        });
})

export const loginUser = createAsyncThunk("users/loginUser", (data) => {
    return axios
        .post("/api/login", data)
        .then(response => {
            return response.data;
        });
})

export const logoutUser = createAsyncThunk("users/logoutUser", () => {
    return axios
        .get("/api/logout")
        .then(response => {
            return response.data;
        });
})

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: builder => {
        //  getUser
        builder.addCase(getUser.pending, state => {
            state.loading = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.message = "";
            state.error = action.error.message;
        })
        //  loginUser
        builder.addCase(loginUser.pending, state => {
            state.loading = true;
            state.success = false;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.success = action.payload.success;
            state.message = action.payload.message
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.success = false;
            state.message = "";
            state.error = action.error.message;
        })
        //  logoutUser
        builder.addCase(logoutUser.pending, state => {
            state.loading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = null;
            state.message = action.payload.message;
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message;
        })
    }
})


export default userSlice.reducer;
