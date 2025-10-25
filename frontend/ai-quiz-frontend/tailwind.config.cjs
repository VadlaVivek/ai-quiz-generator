import compat from "@tailwindcss/upgrade-compat";

/** @type {import('tailwindcss').Config} */
export default compat({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
});
