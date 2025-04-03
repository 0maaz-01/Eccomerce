import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
    // when a request is made to the /api path in the frontend, Vite will forward that request to http://localhost:5000.
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
});
