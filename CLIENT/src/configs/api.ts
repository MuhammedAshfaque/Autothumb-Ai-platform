import axios from 'axios';
const api = axios.create({
  baseURL: "https://autothumb-ai-backend.onrender.com", // Backend server URL
  withCredentials: true, // Include cookies in requests
});
export default api;