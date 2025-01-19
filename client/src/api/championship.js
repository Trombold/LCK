import axios from "./axios";

export const addChampionshipRequest = (data) => axios.post("/championship", data);
export const editChampionshipRequest = (id, data) => axios.put(`/championship/${id}`, data);
export const getChampionshipsRequest = () => axios.get(`/championships`);
export const deleteChampionshipRequest = (id) => axios.delete(`/championship/${id}`);
export const closeChampionshipRequest = (id) => axios.patch(`/championship/close/${id}`);
export const openChampionshipRequest = (id) => axios.patch(`/championship/open/${id}`);
export const getOneChampionshipRequest = (id) => axios.get(`/championship/${id}`)