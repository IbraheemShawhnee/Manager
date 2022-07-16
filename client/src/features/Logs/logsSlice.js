import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    logs: [],
    error: "",
    message: "",
};

export const fetchLogs = createAsyncThunk("logs/fetchLogs", () => {
    return axios
        .get("/api/logs")
        .then(response => {
            const { logs } = response.data;
            return logs;
        });
})

export const fetchMyLogs = createAsyncThunk("logs/fetchMyLogs", () => {
    return axios
        .get("/api/logs/myLogs")
        .then(response => {
            const { logs } = response.data;
            return logs;
        });
})

const logsSlice = createSlice({
    name: "logs",
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchLogs.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchLogs.fulfilled, (state, action) => {
            state.loading = false;
            state.logs = action.payload;
            state.error = "";
        });
        builder.addCase(fetchLogs.rejected, (state, action) => {
            state.loading = false;
            state.logs = [];
            state.error = action.error.message;
        })
        builder.addCase(fetchMyLogs.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchMyLogs.fulfilled, (state, action) => {
            state.loading = false;
            state.logs = action.payload;
            state.error = "";
        });
        builder.addCase(fetchMyLogs.rejected, (state, action) => {
            state.loading = false;
            state.logs = [];
            state.error = action.error.message;
        })
    }
})


export default logsSlice.reducer;
