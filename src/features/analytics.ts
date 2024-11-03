// composables/usePostHog.js
import { inject } from 'vue'
import { PostHog } from 'posthog-js'

export function useAnalytics(): PostHog {
  const posthogInstance: PostHog | undefined = inject('posthog')
  if (!posthogInstance) {
    throw new Error('PostHog has not been provided')
  }
  return posthogInstance
}
