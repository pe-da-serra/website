import { createHead } from '@unhead/vue'
import { App } from 'vue'

export default function useSentry(app: App) {
  const head = createHead();
  app.use(head);
}
