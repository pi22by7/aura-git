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
        signinc: "#e3f4d7ff",
        eventc: "#aade87ff",
        schedulec: "#fff6d5ff",
        profilec: "#e6e6e6ff",
        contactc: "#ffd5d5ff",
      },
      height: (theme) => ({
        "screen/90": "90vh",
        "screen3/4": "75vh",
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "25vh",
        "screen/5": "20vh",
      }),
      backgroundImage: {
        signin: "url('./Assets/reg.png')",
        events: "url('./Assets/events.png')",
        schedule: "url('./Assets/schedule.png')",
        contact: "url('./Assets/contact.png')",
        profile: "url('./Assets/prof.png')",
        contactus: "url('./Assets/contactus.png')",
      },
    },
  },
  plugins: [],
};
