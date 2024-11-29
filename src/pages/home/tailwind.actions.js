
module.exports = {
    // ...
    theme: {
      extend: {
        keyframes: {
          scroll: {
            "0%": { transform: "translateX(-100%)" },
            "100%": { transform: "translateX(0)" },
          },
        },
        animation: {
          "scroll-slow": "scroll 60s linear infinite",
        },
      },
    },
    plugins: [],
  };
  