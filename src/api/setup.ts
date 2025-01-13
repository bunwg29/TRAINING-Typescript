import axios from 'axios';

import { AxiosInstance } from 'axios';

// This function will create instance of axios for operate http request and each request will limit 10 default items
export const instanceAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});
