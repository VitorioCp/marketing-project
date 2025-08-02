import axios from "axios";

export const Api = axios.create({
  baseURL: "https://marketin-site-backend.gtrphk.easypanel.host/",
  withCredentials: true,
});
