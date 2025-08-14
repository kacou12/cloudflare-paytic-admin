export const MerchantRequestsRouteApi = {
  default: '/admin/api/v1/merchant-request',
  update: (id: string)=>`/admin/api/v1/merchant-request/${id}`,
}


// status : pending, approved, rejected
// type : deposit, withdrawal