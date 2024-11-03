import posthog from "posthog-js";
import { App } from "vue";

export default {
  install(app: App) {
    const posthogInstance = posthog.init(
      "phc_SPISQDOQ8JAmXqwhnDMg7gaLks0lJxhA9bG87EUNstG",
      {
        api_host: "https://us.i.posthog.com",
        capture_pageview: false,
        capture_pageleave: false,
      }
    );

    app.provide('posthog', posthogInstance);
  },
};
