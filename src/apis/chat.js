import axios from 'axios';

export const chatApi = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
})
