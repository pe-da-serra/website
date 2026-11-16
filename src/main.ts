/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App.
 * Uses vite-ssg so public pages are pre-rendered to static HTML at build time.
 */

// Components
import App from './App.vue'

// Composables
import { ViteSSG } from 'vite-ssg'

// Plugins
import { registerPlugins } from '@/plugins'
import { routerOptions } from '@/router'

export const createApp = ViteSSG(App, routerOptions, registerPlugins)
