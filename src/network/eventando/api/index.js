import axios from "axios";

const api = axios.create({
  baseURL: "https://eventando.8020digital.com.br/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
