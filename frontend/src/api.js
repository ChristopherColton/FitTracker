import axiot from 'axios';

const api = axiot.create({
  baseURL: 'http://localhost:8080',
});

export default api;