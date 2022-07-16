import axios from "axios";

export const fetchLogs = () => axios.get("/api/logs");
export const findLog = (id) => axios.get(`/api/logs/${id}`);
export const fetchMyLogs = () => axios.get("/api/logs/myLogs");
export const createLog = (data) => axios.post("/api/logs", data);
export const updateLog = (data, id) => axios.put(`/api/logs/${id}`, data);