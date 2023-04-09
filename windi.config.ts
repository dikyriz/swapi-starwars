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
      };
      addComponents(stretched);
    }),
  ],
});
