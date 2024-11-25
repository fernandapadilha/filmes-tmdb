import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjU4MThjOTg2NWM1NDFiMzExZDRiNDEwN2MwM2Q3MCIsIm5iZiI6MTczMjUzODY3OC42MDE4OTQxLCJzdWIiOiI2NzM0YmJlN2M5NzI3ODFiOGQ3M2Q1ZDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PgA5cx9m-0rEiOIRmbqeU7Mbprjfls0vk0XKOhgAW6k`,
  },
});

export default api;