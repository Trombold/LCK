import axios from "./axios";

export const getInscriptionCurrentRequest = (id) => axios.get(`/inscriptions/validate/${id}`);

export const addInscriptionRequest = async (formData) => {
  return await axios.post(`/inscriptions`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getInscriptionsCurrentRequest = () => axios.get("/inscriptions/current/validate");

export const confirmInscriptionRequest = (id) => axios.patch(`/inscriptions/${id}`);

export const deleteInscriptionRequest = (id) => axios.delete(`/inscriptions/${id}`);

