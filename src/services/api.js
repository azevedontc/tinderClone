import axios from "axios";

const token = window.localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://api.yuri.engineer/api/v1",
  //baseURL: "localhost", 
  // baseURL: "http://147.182.143.140:4444/api/v1",
  headers:
    token && token !== null
      ? { Authorization: `Bearer ${window.localStorage.getItem("token")}` }
      : {},
});

export default api;
