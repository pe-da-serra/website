/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import sentry from './sentry'
import vuetify from './vuetify'
import router from '../router'
import tanstack from './tanstack'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(sentry)
    .use(vuetify)
    .use(router)
    .use(tanstack)
}
