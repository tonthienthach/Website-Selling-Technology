import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const instanceApiGHN = axios.create({
  baseURL: "https://dev-online-gateway.ghn.vn/shiip/public-api/",
});

instanceApiGHN.interceptors.request.use((config) => {
  const token = "03fbbe34-dbb4-11ed-ab31-3eeb4194879e";
  config.headers.Token = token;
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default instance;
