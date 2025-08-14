import axios from "axios";

const http = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});


http.interceptors.request.use(
  (config) => {
    console.log('... LOG: request.use', config);

    const token = localStorage.getItem('authToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    console.log('... LOG: response.use', response);

    return response
  },
  (error) => {
    console.log('... LOG: response.use error', error);

    // if (error.response && error.response.status === 401) {
    // Lógica para lidar com não autorizado, e.g., redirecionar para login
    // console.error('Não autorizado, redirecionando para login...');
    // window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

export default http