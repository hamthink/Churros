import axios from "axios";
//  axios instances
// to api server
export const api = axios.create({
  baseURL: "https://churros.site/api",
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  else{
    console.log("accessToken not exists")
  }
  return config;
});

export const test = axios.create({
  baseURL: "https://churros.site/api/test",
});