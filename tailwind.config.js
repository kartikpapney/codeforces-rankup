/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "newbie": "rgb(204,204,204)",
        "pupil": "rgb(138,235,118)",
        "specialist": "rgb(122,221,187)",
        "expert": "rgb(170,170,254)",
        "candidate master": "rgb(224,129,254)",
        "master": "rgb(247,203,136)",
        "international master": "rgb(244,185,85)",
        "grandmaster": "rgb(230,113,119)",
        "international grandmaster": "rgb(228,79,52)",
        "legendary grandmaster": "rgb(173,56,2)"
    }
    },
  },
  plugins: [],
}