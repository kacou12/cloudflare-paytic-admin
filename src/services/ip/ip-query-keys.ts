import type { DefaultFiltersPayload } from '../global.type'

export const ipQueryKeys = {
  ip: ({ x_id }: { x_id: string }) => ['ip', x_id],
  ipsPagination: (page: number) => ['ip', page],
  ipsFilters: (payload: DefaultFiltersPayload) => ['ip', payload.page, payload.q],
}
