import axios from "axios";

const ApiFile = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  dataType: "json",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

ApiFile.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (config.method === "post") {
      config.data.append("userAudit", localStorage.getItem("userAudit"));
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default ApiFile;
