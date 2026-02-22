import axios from "axios";

const API = axios.create({
  baseURL: "https://releasecheck-backend.onrender.com/api"
});

export default API;