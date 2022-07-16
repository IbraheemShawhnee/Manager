import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    payees: [],
    error: "",
    message: "",
};

export const createPayee = createAsyncThunk("payees/createPayee", (data) => {
    return axios
        .post(`/api/payees`, data)
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

export const fetchPayees = createAsyncThunk("payees/fetchPayees", () => {
    return axios
        .get("/api/payees")
        .then(response => {
            const { payees } = response.data;
            return payees;
        });
})

export const findPayee = createAsyncThunk("payees/findPayee", (id) => {
    return axios
        .get(`/api/payees/${id}`)
        .then(response => {
            const { payee } = response.data;
            return payee;
        });
})

export const updatePayee = createAsyncThunk("payees/updatePayee", (id, data) => {
    console.log(data);
    return axios
        .put(`/api/payees/${id}`, data)
        .then(response => {
            console.log(response);
            const { message } = response.data;
            return message;
        });
})

export const deletPayee = createAsyncThunk("payees/deletPayee", (id) => {
    return axios
        .delete(`/api/payees/${id}`)
        .then(response => {
            const { payee } = response.data;
            return payee;
        });
})


const payeesSlice = createSlice({
    name: "payees",
    initialState,
    extraReducers: builder => {
        //  CREATE
        builder.addCase(createPayee.pending, state => {
            state.loading = true;
        });
        builder.addCase(createPayee.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(createPayee.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
        //  FETCH ALL
        builder.addCase(fetchPayees.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchPayees.fulfilled, (state, action) => {
            state.loading = false;
            state.payees = action.payload;
            state.error = "";
        });
        builder.addCase(fetchPayees.rejected, (state, action) => {
            state.loading = false;
            state.payees = [];
            state.error = action.error.message;
        })
        //  FETCH USER
        builder.addCase(findPayee.pending, state => {
            state.loading = true;
        });
        builder.addCase(findPayee.fulfilled, (state, action) => {
            state.loading = false;
            state.payees = action.payload;
            state.error = "";
        });
        builder.addCase(findPayee.rejected, (state, action) => {
            state.loading = false;
            state.payees = [];
            state.error = action.error.message;
        })
        //  UPDATE
        builder.addCase(updatePayee.pending, state => {
            state.loading = true;
        });
        builder.addCase(updatePayee.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(updatePayee.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
        //  DELETE
        builder.addCase(deletPayee.pending, state => {
            state.loading = true;
        });
        builder.addCase(deletPayee.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(deletPayee.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
    }
})


export default payeesSlice.reducer;
