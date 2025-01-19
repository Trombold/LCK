import axios from "./axios";

export const registerRequest = (user) => axios.post(`/users/signup`, user);

export const loginRequest = (credentials) => axios.post(`/users/signin`, credentials);

export const logoutRequest = () => axios.get(`/users/logout`);

export const verifyTokenRequest = () => axios.get(`/users/auth/verify`);

export const updateProfileRequest = (data) => axios.put(`/users/profile`, data);

export const updatePasswordRequest = (data) => axios.patch(`/users/change/password`, data);

export const postResquePasswordRequest = (data) => axios.post(`/users/resque-password`, data);

export const patchResquePasswordRequest = (data) => axios.patch(`/users/resque-password`, data)

export const patchResquePasswordForgotRequest = (data) => axios.patch(`/users/resque-password-forgot`, data)