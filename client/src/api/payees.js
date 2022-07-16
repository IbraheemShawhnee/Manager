import axios from "axios";

export const fetchPayees = () => axios.get("/api/payees");
export const findPayee = (id) => axios.get(`/api/payees/${id}`);
export const createPayee = (data) => axios.post("/api/payees", data);
export const updatePayee = (data, id) => axios.put(`/api/payees/${id}`, data);