// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { md2, md3 } from 'vuetify/blueprints'
import { pt } from 'vuetify/locale'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          colors: {
            primary: '#2e8a34',
            secondary: '#293F00',
            background: '#eff3ef'
          },
        },
      },
    },
    blueprint: md2,
    locale: {
      locale: 'pt',
      messages: { pt }
    }
  })
  app.vueApp.use(vuetify)
});
