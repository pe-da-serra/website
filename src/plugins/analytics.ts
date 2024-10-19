import router from "@/router";
import { App } from "vue";
import VueGtag, { PluginOptions } from "vue-gtag";


export default function useAnalytics(app: App) {
  app.use(VueGtag, {
    config: { id: "G-6T3H0CXL64" },
  } as PluginOptions, router);
}
