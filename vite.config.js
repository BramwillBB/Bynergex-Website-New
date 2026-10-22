// Multi-page build: the home page plus one landing page per service, each its own URL for search.
import { resolve } from "node:path";
import { defineConfig } from "vite";

const page = (p) => resolve(import.meta.dirname, p);

export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        home: page("index.html"),
        energy: page("energy-audit/index.html"),
        sseg: page("sseg-commissioning/index.html"),
        assurance: page("electrical-compliance-assurance/index.html"),
        blog: page("blog/index.html"),
        post1: page("blog/energy-audit-before-solar-south-africa/index.html"),
        post2: page("blog/sseg-registration-cape-town-guide/index.html"),
      },
    },
  },
});
