import axios from 'axios';

const BASE_URL = 'https://dream-ai-server.onrender.com/api';

export const api = axios.create({
  baseURL: BASE_URL,
});
