import axios from "axios";

const API = axios.create({
  baseURL:"https://blog-platform-server.onrender.com"
});

export default API;