import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL + '/v1' || 'http://localhost:3001/v1',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
