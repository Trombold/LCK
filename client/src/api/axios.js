import axios from 'axios';

const instance = axios.create({
  baseURL: "https://lck.onrender.com/api" || "http://localhost:5000/api",
  withCredentials: true
})

export default instance
