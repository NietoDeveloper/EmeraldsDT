import axios from "axios";

const instance = axios.create({
  baseURL: "https://lets-falafel-back-final.vercel.app/api",
  // baseURL: "https://api.letsfalafel.com/api",
  // baseURL: "http://localhost:8080/api",
});

export default instance;