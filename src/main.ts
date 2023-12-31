/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
// import { createApp } from 'vue'
import { ViteSSG } from 'vite-ssg'

// Plugins
import { registerPlugins } from '@/plugins';
import { routes } from '@/router';

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
  // function to have custom setups
  (context) => {
    registerPlugins(context.app);
    // Object.values(import.meta.glob('./modules/*.ts', { eager: true })).map(i => i.instnpmall?.(context))
  },
)

// const app = createApp(App)

// registerPlugins(app)

// app.mount('#app')
