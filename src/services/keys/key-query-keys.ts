import type { DefaultFiltersPayload } from '../global.type'

export const keysQueryKeys = {
  all: ['keys'] as const,
  keysFilters: (payload: DefaultFiltersPayload) =>
    [
      'keys',
      payload.page,
      payload.q,
      // payload.merchant_id,
      // payload.environment,
    ] as const,
  key: (id: string) => [...keysQueryKeys.all, id] as const,
}
