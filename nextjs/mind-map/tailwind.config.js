/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

module.exports = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        bgrHome: `url('https://media.istockphoto.com/id/842312384/vi/anh/doanh-nh%C3%A2n-v%E1%BA%BD-s%C6%A1-%C4%91%E1%BB%93-s%C6%A1-%C4%91%E1%BB%93-t%C6%B0-duy-trong-notebook.jpg?s=2048x2048&w=is&k=20&c=anbtDTmsS1K89LIkGjMAV8Ai31cIm3I6xO3Cdy2RinQ=')`,
      },
    },
  },
  plugins: [nextui()],
};
