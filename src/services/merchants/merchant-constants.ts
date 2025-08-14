import type { updateCharge } from "../charge/charge-service";

export const MerchantRouteApi = {
  default: '/admin/api/v1/merchant',
  updateCharges: '/admin/api/v1/merchant-charge/multiple',
  stats: "/admin/api/v1/transaction/stats-merchant",
  transactions:(id: string) => `/admin/api/v1/transaction/merchant/${id}`,
  getOne: (id: string) => `/admin/api/v1/merchant/${id}`,
}
