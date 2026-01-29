import axios from 'axios';
const api = axios.create({
  baseURL: "https://autothumb-server.vercel.app", // Backend server URL
  withCredentials: true, // Include cookies in requests
});
export default api;