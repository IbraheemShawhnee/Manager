import axios from "axios";

export const fetchCheques = () => axios.get("/api/cheques");
export const findCheque = (id) => axios.get(`/api/cheques/${id}`);
export const createCheque = (data) => axios.post("/api/cheques", data);
export const updateCheque = (data, id) => axios.put(`/api/cheques/${id}`, data);