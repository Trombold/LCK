import axios from "./axios";

const kartsUrl = "/karts";

export const addKartRequest = (data) => axios.post(kartsUrl, data);

export const getKartsRequest = (emailUser) => axios.get(`${kartsUrl}/${emailUser}`);

export const getOneKartRequest = (id) => axios.get(`${kartsUrl}/one/${id}`);

export const editKartRequest = (id, data) => axios.put(`${kartsUrl}/${id}`, data);

export const deleteKartRequest = (id) => axios.delete(`${kartsUrl}/${id}`);

export const getKartsInscribedRequest = () => axios.get(`${kartsUrl}/inscritos/current/validate`)

export const patchNameTransponderkartRequest = (id, data) => axios.patch(`${kartsUrl}/transponder/${id}`, data)