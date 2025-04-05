import axios from 'axios';

const BASE_URL = 'https://image-generation-server-phi.vercel.app/api';

export const api = axios.create({
  baseURL: BASE_URL,
});
