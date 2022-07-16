import axios from "axios";

export const fetchBills = () => axios.get("/api/bills");
export const findBill = (id) => axios.get(`/api/bills/${id}`);
export const createBill = (data) => axios.post("/api/bills", data);
export const updateBill = (data, id) => axios.put(`/api/bills/${id}`, data);