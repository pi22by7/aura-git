/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001233",
        secondary: "#002855",
        tertiary: "#023e7d",
        quaternary: "#0466c8",
      },
      height: (theme) => ({
        "screen/90": "90vh",
        "screen3/4": "75vh",
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "25vh",
        "screen/5": "20vh",
      }),
    },
  },
  plugins: [],
};
