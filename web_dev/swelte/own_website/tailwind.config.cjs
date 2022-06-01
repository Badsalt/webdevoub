module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake", "retro", "dracula", "light", "bumblebee", "emerald", "corporate", "synthwave",  "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
  },
}
