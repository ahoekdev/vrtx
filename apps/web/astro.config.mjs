import { defineConfig } from "astro/config";
import { webcore } from "webcoreui/integration";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),
  integrations: [webcore()],
});
