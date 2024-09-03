import * as Sentry from "@sentry/vue";
import { App } from "vue";

export default function useSentry(app: App) {
  Sentry.init({
    app,
    dsn: "https://0141c242d887304ce15f199ea4ed46db@o4507353488097280.ingest.us.sentry.io/4507886445592576",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/api\.reserve-ja\.com/, /^https:\/\/api-demo\.reserve-ja\.com/],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}
