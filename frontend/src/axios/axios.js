import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:5000',
})

instance.interceptors.request.use((config) => {
    const token = localStorage.token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export const instanceGetProduct = axios.create({
    baseURL: 'http://localhost:5000',
})

export default instance;

