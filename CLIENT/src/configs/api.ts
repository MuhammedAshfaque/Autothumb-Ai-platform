import axios from 'axios';
const api = axios.create({
  baseURL: 'https://autothumb-ai-platform.vercel.app', // Backend server URL
  withCredentials: true, // Include cookies in requests
});
export default api;