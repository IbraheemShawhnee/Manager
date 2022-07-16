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

export const findLog = createAsyncThunk("logs/findLog", (id) => {
    return axios
        .get(`/api/logs/${id}`)
        .then(response => {
            const { log } = response.data;
            return log;
        });
})

const logsSlice = createSlice({
    name: "logs",
    initialState,
    extraReducers: builder => {
        //  Fetch All Logs
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
        //  Fetch My Logs
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
        //  Find Log
        builder.addCase(findLog.pending, state => {
            state.loading = true;
        });
        builder.addCase(findLog.fulfilled, (state, action) => {
            state.loading = false;
            state.logs = action.payload;
            state.error = "";
        });
        builder.addCase(findLog.rejected, (state, action) => {
            state.loading = false;
            state.logs = [];
            state.error = action.error.message;
        })
    }
})


export default logsSlice.reducer;
