import type { AstroConfig, AstroIntegration } from 'astro';

import { writeFile } from 'node:fs/promises';

export default function seoFiles(): AstroIntegration {
  let site: URL | undefined;

  return {
    name: 'cozymoney-seo-files',

    hooks: {
      'astro:config:done': ({ config }: { config: AstroConfig }) => {
        site = config.site;
      },

      'astro:build:done': async ({ pages, dir }) => {
        if (!site) {
          throw new Error(
            'cozymoney-seo-files requires the Astro site configuration.',
          );
        }

        const baseUrl = new URL(site.href);
        const paths = [...new Set(
          pages
            .map(({ pathname }) => pathname)
            .filter(
              (pathname) =>
                pathname !== '/404' &&
                pathname !== '/404/' &&
                !pathname.endsWith('/404.html'),
            ),
        )].sort();

        const urls = paths
          .map((pathname) => {
            const url = new URL(pathname, baseUrl).href;
            const escaped = url
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&apos;');

            return `  <url><loc>${escaped}</loc></url>`;
          })
          .join('\n');

        const sitemap = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          urls,
          '</urlset>',
          '',
        ].join('\n');

        const sitemapUrl = new URL('sitemap.xml', baseUrl).href;
        const robots = [
          'User-agent: *',
          'Allow: /',
          '',
          `Sitemap: ${sitemapUrl}`,
          '',
        ].join('\n');

        await Promise.all([
          writeFile(new URL('sitemap.xml', dir), sitemap, 'utf8'),
          writeFile(new URL('robots.txt', dir), robots, 'utf8'),
        ]);
      },
    },
  };
}
