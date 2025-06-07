import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://perniaph.com',
  redirects: {
    '/admin': 'https://perniaph.sanity.studio/structure',
  },
  integrations: [
    tailwind(), 
    react(),
    sanity({
      projectId: 'kkbq5txa',
      dataset: 'production',
      // Set useCdn to false if you're building statically.
      useCdn: false,
    }), 
  ]
});