import axios from "axios";

export const fetchWorkers = () => axios.get("/api/workers");
export const findWorker = (id) => axios.get(`/api/workers/${id}`);
export const createWorker = (data) => axios.post("/api/register", data);
export const updateWorker = (data, id) => axios.put(`/api/workers/${id}`, data);