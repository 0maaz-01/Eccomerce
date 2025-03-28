/*import axios from "axios";

const axiosInstance = axios.create({
	// baseURL sets the base URL for the Axios instance.
	// If we're in development mode, we visit localhost. If not, we visit the /api endpoint on the website.
	baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
	withCredentials: true, 	// send cookies to the server
});

export default axiosInstance;
*/


import axios from "axios";

const axiosInstance = axios.create({
	// baseURL sets the base URL for the Axios instance.
	// agr hum development mode me h to local host jake visit kr sakte h and agar hum upload kr chuke h to uss website ke url + /api pe  jake visit karenge.
	baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
	withCredentials: true, 		// send cookies to the server
});

export default axiosInstance;
