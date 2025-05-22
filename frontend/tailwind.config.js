/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {

			colors: {
				main: '#FFE4C4', //#FFE4C4
				side: '#8e4c41',
				hovering: "#f89d2e",
				dark : "#56312a",
				buttonhover : "#f89d2e",
				inputfill : "##ffc175"
			},

		},
	},
	plugins: [],
};
