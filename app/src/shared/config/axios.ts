import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v2',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer baa39e2f332943c94998c6b9d6d7a43bb85edf1adc8fb1b99dc29c0f951ad23d',
  },
});

export default api;