
import { authCookie } from "@/@features/memory/cookie/cookie";
import axios, { type AxiosInstance } from "axios";

const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
httpClient.interceptors.request.use(
  (config) => {
    const { token } = authCookie.get()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// httpClient.interceptors.response.use(
//   (response) => {
//     console.log('... LOG: response.use', response);

//     return response
//   },
//   (error) => {
//     console.log('... LOG: response.use error', error);

// if (error.response && error.response.status === 401) {
// Lógica para lidar com não autorizado, e.g., redirecionar para login
// console.error('Não autorizado, redirecionando para login...');
// window.location.href = '/login';
// }
//     return Promise.reject(error);
//   }
// );
type HttpClient = AxiosInstance

export type { HttpClient };

export default httpClient