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

export const createLog = createAsyncThunk("logs/createLog", (data) => {
    data.date = new Date(data.date);
    return axios
        .post(`/api/logs`, {
            log: data
        })
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

export const updateLog = createAsyncThunk("logs/updateLog", (requestObj) => {
    const { id, data } = requestObj;
    console.log(`/api/logs/${id}`);
    return axios
        .put(`/api/logs/${id}`, {
            log: data
        })
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

const logsSlice = createSlice({
    name: "logs",
    initialState,
    extraReducers: builder => {
        //  CREATE
        builder.addCase(createLog.pending, state => {
            state.loading = true;
        });
        builder.addCase(createLog.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(createLog.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
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
        //  UPDATE
        builder.addCase(updateLog.pending, state => {
            state.loading = true;
        });
        builder.addCase(updateLog.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(updateLog.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
    }
})


export default logsSlice.reducer;
