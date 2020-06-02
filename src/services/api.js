import axios from "axios";

const api = axios.create({
  baseURL: "http://carolclara.pythonanywhere.com/order/",
  // baseURL: process.env.REACT_APP_API_URL,
});
export default api;
