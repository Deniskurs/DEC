import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://myfxbook-api.vercel.app/api", // Replace with your API base URL
	timeout: 10000, // Increased timeout to 10 seconds for mobile networks
	headers: { "Content-Type": "application/json" },
});

export default apiClient;
