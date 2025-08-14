import type { DefaultFiltersPayload, WebhookFiltersPayload } from '../global.type'

export const webhookQueryKeys = {
  all: ['webhooks'],
  webhookFilters: (payload: WebhookFiltersPayload) => [
    'webhooks',
    payload.page,
    payload.q,
    payload.environment,
    payload.merchant_id,
    payload.size,
    // payload.country_id,
  ],
  webhook: (id: string) => ['webhooks', id],
}
