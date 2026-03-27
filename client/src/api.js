import axios from "axios";

const API = axios.create({
  baseURL:"https://blog-platform-fxci.onrender.com"
});

export default API;