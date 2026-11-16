/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import sentry from './sentry'
import vuetify from './vuetify'
import tanstack from './tanstack'
import analytics from './analytics'
import { installRouterAnalytics } from '../router'

// Types
import type { ViteSSGContext } from 'vite-ssg'

// Router and head are created by vite-ssg. Browser-only plugins are skipped
// while pre-rendering pages at build time.
export function registerPlugins ({ app, router, isClient }: ViteSSGContext) {
  app
    .use(vuetify)
    .use(tanstack)

  if (isClient) {
    loadFonts()
    app
      .use(sentry)
      .use(analytics)
    installRouterAnalytics(router)
  }
}
