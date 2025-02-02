import axios from "axios";

const apiFxBookClient = axios.create({
  baseURL: "https://myfxbook-api.vercel.app/api", // Replace with your API base URL
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export default apiFxBookClient;
