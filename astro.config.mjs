import { defineConfig } from 'astro/config';

// import netlify from "@astrojs/netlify";

import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // adapter: netlify({
  //   edgeMiddleware: true
  // }),
  integrations: [tailwind(), mdx()],
  adapter: netlify()
});