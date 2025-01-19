import axios from "./axios";

export const addResultRequest = (data) => axios.post("/results", data);
export const getAllResultsActiveRequest = () => axios.get("/results/all/active");
export const deleteResultRequest = (id) => axios.delete(`/results/${id}`);

export const getResultsOpenActiveRequest = () => axios.get("/results/championship/open");
export const getResultsClosedActiveRequest = () => axios.get("/results/championship/close");
export const getResultsTotalActiveRequest = () => axios.get("/results/championship/final")