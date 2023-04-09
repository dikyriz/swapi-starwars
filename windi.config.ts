import { defineConfig } from "windicss/helpers";
import plugin from "windicss/plugin";

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "serif"],
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      const stretched = {
        ".stretched-link": {
          position: "absolute",
          top: "0",
          right: "0",
          left: "0",
          bottom: "0",
          zIndex: "1",
          pointerEvent: "auto",
          content: "",
          backgroundColor: "rgba(0,0,0,0)",
        },
        ".grad": {
          background: "#0F2027",
        },
        ".filters": {
          background:
            "-webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027)",
        },
        ".colors": {
          background: "linear-gradient(to right, #2C5364, #203A43, #0F2027)",
        },
        ".grad-2": {
          background: "#000000",
        },
        ".deep": {
          background: "-webkit-linear-gradient(to bottom, #434343, #000000)",
        },
        ".space": {
          background: "linear-gradient(to bottom, #434343, #000000)",
        },
      };
      addComponents(stretched);
    }),
  ],
});
