import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    bills: [],
    error: "",
    message: "",
};

export const createBill = createAsyncThunk("bills/createBill", (data) => {
    data.date = new Date(data.date);
    return axios
        .post(`/api/bills`, { bill: data })
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

export const fetchBills = createAsyncThunk("bills/fetchBills", () => {
    return axios
        .get("/api/bills")
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

export const updateBill = createAsyncThunk("bills/updateBill", (requestObj) => {
    const { id, data } = requestObj;
    return axios
        .put(`/api/bills/${id}`, {
            bill: data
        })
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

export const deleteBill = createAsyncThunk("bills/deleteBill", (id) => {
    return axios
        .delete(`/api/bills/${id}`)
        .then(response => {
            const { worker } = response.data;
            return worker;
        });
})


const billsSlice = createSlice({
    name: "bills",
    initialState,
    extraReducers: builder => {
        //  createBill
        builder.addCase(createBill.pending, state => {
            state.loading = true;
        });
        builder.addCase(createBill.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(createBill.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        //  fetchBills
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
        //  findBill
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
        //  UPDATE
        builder.addCase(updateBill.pending, state => {
            state.loading = true;
        });
        builder.addCase(updateBill.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(updateBill.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
        //  DELETE
        builder.addCase(deleteBill.pending, state => {
            state.loading = true;
        });
        builder.addCase(deleteBill.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(deleteBill.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })

    }
})


export default billsSlice.reducer;
