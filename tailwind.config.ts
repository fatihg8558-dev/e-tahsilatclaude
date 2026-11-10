import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { obsidian: "#0a0e13", mint: "#2dd4bf", ember: "#fb923c" } } },
  plugins: [],
};
export default config;
