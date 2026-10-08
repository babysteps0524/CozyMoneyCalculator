import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';
import seoFiles from './src/integrations/seo-files';

export default defineConfig({
  integrations: [UnoCSS(), seoFiles()],
  output: 'static',
  site: 'https://cozymoney.kr',

  server: {
    open: true,},
});