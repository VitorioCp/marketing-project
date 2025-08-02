import axios from "axios";

export const Api = axios.create({
  baseURL: "http://marketin_site_backend:80/",
  withCredentials: true,
});
