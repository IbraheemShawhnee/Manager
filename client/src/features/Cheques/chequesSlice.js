import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    cheques: [],
    error: "",
    message: "",
};

export const fetchCheques = createAsyncThunk("cheques/fetchCheques", () => {
    return axios
        .get("/api/cheques")
        .then(response => {
            const { cheques, sum } = response.data;
            return { cheques, sum };
        });
})

export const findCheque = createAsyncThunk("cheques/findCheque", (id) => {
    return axios
        .get(`/api/cheques/${id}`)
        .then(response => {
            const { cheque } = response.data;
            return cheque;
        });
})

export const addCheque = createAsyncThunk("cheques/addCheque", (data) => {
    return axios
        .post(`/api/cheques`, data)
        .then(response => {
            const { message } = response.data;
            console.log(message);
            return message;
        });
})

const chequesSlice = createSlice({
    name: "cheques",
    initialState,
    extraReducers: builder => {
        //  fetchCheques
        builder.addCase(fetchCheques.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchCheques.fulfilled, (state, action) => {
            state.loading = false;
            state.cheques = action.payload;
            state.error = "";
        });
        builder.addCase(fetchCheques.rejected, (state, action) => {
            state.loading = false;
            state.cheques = [];
            state.error = action.error.message;
        })
        //  findCheque
        builder.addCase(findCheque.pending, state => {
            state.loading = true;
        });
        builder.addCase(findCheque.fulfilled, (state, action) => {
            state.loading = false;
            state.cheques = action.payload;
            state.error = "";
        });
        builder.addCase(findCheque.rejected, (state, action) => {
            state.loading = false;
            state.cheques = [];
            state.error = action.error.message;
        })
        //  addCheque
        builder.addCase(addCheque.pending, state => {
            state.loading = true;
        });
        builder.addCase(addCheque.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(addCheque.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

    }
})


export default chequesSlice.reducer;
