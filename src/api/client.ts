import axios from 'axios';
import { API_CONFIG } from '@/utils/constants';

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    'x-api-key': API_CONFIG.apiKey,
  },
});
