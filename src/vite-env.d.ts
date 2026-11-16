/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_ADS_SEND_TO?: string
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
