import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import {  MerchantRequestsRouteApi } from './merchant-request-constants'
import type { MerchantRequestResponse } from './merchant-request.type'
import type { RejectMerchantRequest } from './merchant-request-schema'
import { MerchantRequestStatusEnum } from '@/constants/constant.enum'

export async function fetchMerchantRequestsApi({
  payload,
}: {
  payload: DefaultFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<MerchantRequestResponse>> | undefined> {
   payload.dates![0].setHours(0, 0, 0, 0)
  payload.dates![1].setHours(23, 59, 59, 59)

  const formatPayload = {
    startDate: payload.dates![0].toISOString(),
    endDate: payload.dates![1].toISOString(),
    ...payload,
  }
  const result = await Http.get<SuccessResponse<PaginationResponse<MerchantRequestResponse>>>(
   MerchantRequestsRouteApi.default,
    formatPayload,
  )

  return result
}

export async function validateMerchantRequestApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(
    MerchantRequestsRouteApi.update(id),
    {
      status: MerchantRequestStatusEnum.Approved
    },
  )
}

export async function rejectMerchantRequestApi({
  id,
  data,
}: {
  id: string
  data: RejectMerchantRequest
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(
  MerchantRequestsRouteApi.update(id),
    data,
  )
}
