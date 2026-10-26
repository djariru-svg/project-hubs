import axios from 'axios';

const api = axios.create({
  // Iyi ni URL ya backend yawe (muri HIDE)
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Iyi function ishyira Token muri buri request (niba umukoresha yinjiye)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;