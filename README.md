# default

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

Public pages (home, hotel, rooms, gallery, contact) are pre-rendered to static
HTML with [vite-ssg](https://github.com/antfu-collective/vite-ssg), so search engines
get the full content without running JavaScript. Booking pages (`/reserva`,
`/pagamento`) stay client-rendered and are served from `app.html` via
`public/_redirects` (Cloudflare Pages). Code that touches browser APIs at startup
must only run on the client (see `src/plugins/index.ts`).

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
