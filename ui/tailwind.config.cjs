/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
		fontFamily: {
			"sans": ["'Source Sans 3'", "sans-serif"],
		},
	}
  },
  plugins: []
};
