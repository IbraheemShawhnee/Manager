import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    bills: [],
    error: "",
    message: "",
};

export const fetchBills = createAsyncThunk("bills/fetchBills", (page) => {
    return axios
        .get(`/api/bills?page=${page}`)
        .then(response => {
            const { bills, sum } = response.data;
            return { bills, sum };
        });
})

export const findBill = createAsyncThunk("bills/findBill", (id) => {
    return axios
        .get(`/api/bills/${id}`)
        .then(response => {
            const { bill } = response.data;
            return bill;
        });
})

const billsSlice = createSlice({
    name: "bills",
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchBills.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchBills.fulfilled, (state, action) => {
            state.loading = false;
            state.bills = action.payload;
            state.error = "";
        });
        builder.addCase(fetchBills.rejected, (state, action) => {
            state.loading = false;
            state.bills = [];
            state.error = action.error.message;
        })
        builder.addCase(findBill.pending, state => {
            state.loading = true;
        });
        builder.addCase(findBill.fulfilled, (state, action) => {
            state.loading = false;
            state.bills = action.payload;
            state.error = "";
        });
        builder.addCase(findBill.rejected, (state, action) => {
            state.loading = false;
            state.bills = [];
            state.error = action.error.message;
        })
    }
})


export default billsSlice.reducer;
