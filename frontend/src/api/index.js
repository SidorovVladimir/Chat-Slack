/* eslint-disable no-param-reassign */

import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

api.interceptors.request.use(
  (config) => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (config.headers && userId) {
      config.headers.Authorization = `Bearer ${userId.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
