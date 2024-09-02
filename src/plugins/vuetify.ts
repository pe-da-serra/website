/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { md2, md3 } from 'vuetify/blueprints'
import { pt } from 'vuetify/locale'

import LuxonAdapter from '@date-io/luxon'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  ssr: true,
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#2e8a34',
          secondary: '#013818',
          background: '#eff3ef'
        },
      },
    },
  },
  blueprint: md3,
  locale: {
    locale: 'pt',
    messages: { pt }
  },
  date: {
    // adapter: LuxonAdapter,
  },
  defaults: {
    VBtn: {
      class: 'text-none',
    },
  },
})
