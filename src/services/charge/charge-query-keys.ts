import type { DefaultFiltersPayload } from '../global.type'

export const chargesQueryKeys = {
  all: ['charges'] as const,
  chargesFilters: (payload: DefaultFiltersPayload) =>
    [
      'charges',
      payload.page,
      payload.q,
      // payload.country_id,
    ] as const,
  charge: (id: string) => [...chargesQueryKeys.all, id] as const,
}
