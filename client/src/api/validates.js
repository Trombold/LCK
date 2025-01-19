import axios from "./axios";

export const addValidateRequest = (data) => axios.post("/validate", data);
export const editValidateRequest = (id, data) => axios.put(`/validate/${id}`, data);
export const getValidatesRequest = () => axios.get(`/validates`);
export const deleteValidateRequest = (id) => axios.delete(`/validate/${id}`);

export const closeValidateRequest = (id) => axios.patch(`/validate/close/${id}`);
export const openValidateRequest = (id) => axios.patch(`/validate/open/${id}`);

export const getOneValidateRequest = (id) => axios.get(`/validate/${id}`)

export const getCurrentValidateRequest = () => axios.get(`/validate-active`)