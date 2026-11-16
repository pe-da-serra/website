import { sentryVitePlugin } from "@sentry/vite-plugin";
// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig, Plugin } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { writeFileSync } from 'node:fs'
import type {} from 'vite-ssg'

const siteUrl = 'https://pedaserrahotel.com.br';
const clientRenderedPaths = ['/reserva', '/pagamento'];
// Client-rendered pages that should still be indexed.
const indexedClientPaths = ['/reserva'];

let sitemapPaths: string[] = [];

const writeSitemap = () => {
  const urls = [...sitemapPaths, ...indexedClientPaths]
    .map(path => `  <url><loc>${siteUrl}${path}</loc></url>`)
    .join('\n');
  writeFileSync(
    fileURLToPath(new URL('./dist/sitemap.xml', import.meta.url)),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
};

// vite-ssg overwrites index.html with the pre-rendered home page. Keep an empty
// copy of the app shell for client-rendered routes (see public/_redirects).
const spaShell = (): Plugin => ({
  name: 'spa-shell',
  apply: 'build',
  enforce: 'post',
  generateBundle(_, bundle) {
    const index = bundle['index.html'];
    if (index?.type !== 'asset') return;

    // Crawlers (WhatsApp, Facebook, Google) don't run JavaScript, so booking
    // links need their share tags in the static HTML.
    const image = Object.values(bundle).find(file => file.type === 'asset' && file.name === 'hotel-1.jpg');
    const title = 'Reserva online | Pé da Serra Hotel em Resende, RJ';
    const description = 'Consulte disponibilidade e preços e faça sua reserva online no Pé da Serra Hotel, em Resende (RJ). Rápido, fácil e seguro.';
    const shareTags = [
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="Pé da Serra Hotel" />`,
      `<meta property="og:locale" content="pt_BR" />`,
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:url" content="${siteUrl}/reserva" />`,
      ...(image ? [
        `<meta property="og:image" content="${siteUrl}/${image.fileName}" />`,
        `<meta property="og:image:secure_url" content="${siteUrl}/${image.fileName}" />`,
        `<meta property="og:image:type" content="image/jpeg" />`,
        `<meta property="og:image:width" content="1154" />`,
        `<meta property="og:image:height" content="768" />`,
        `<meta property="og:image:alt" content="${title}" />`,
      ] : []),
      `<meta name="twitter:card" content="summary_large_image" />`,
    ].join('\n    ');

    const source = String(index.source)
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
      .replace('</head>', `    ${shareTags}\n</head>`);

    this.emitFile({ type: 'asset', fileName: 'app.html', source });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: { transformAssetUrls },
    script: {
      defineModel: true
    },
  }), // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
  vuetify({
    autoImport: true,
  }), spaShell(), sentryVitePlugin({
    org: "reserve-ja",
    project: "pe-da-serra"
  })],

  define: { 'process.env': {} },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },

  server: {
    port: 3000,
  },

  ssr: {
    noExternal: ['vuetify'],
  },

  build: {
    sourcemap: true
  },

  ssgOptions: {
    formatting: 'minify',
    // Only public marketing pages are pre-rendered. Booking pages depend on live
    // availability and browser-only APIs, so they stay client-rendered.
    includedRoutes: paths => sitemapPaths = [...new Set(paths.map(path => `/${path.replace(/^\//, '')}`))]
      .filter(path => !clientRenderedPaths.some(prefix => path.startsWith(prefix))),
    onFinished: writeSitemap,
  },
})