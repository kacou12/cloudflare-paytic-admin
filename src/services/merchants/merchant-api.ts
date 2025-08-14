// import { env } from '@/config/env'
import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import type { TransactionResponse } from '../transactions/transaction-type'
import { MerchantRouteApi } from './merchant-constants'
import type { MerchantPayinPayoutChargePayload, MerchantRequest, MerchantResponse, MerchantStatsPayload, MerchantStatsResponse, MerchantStatusPayload, MerchantUpdatePayload } from './merchant-type'; // Added MerchantStatsPayload, MerchantStatsResponse

export async function fetchFiltersMerchantsApi({
  payload,
}: {
  payload: DefaultFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<MerchantResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<MerchantResponse>>>(
    MerchantRouteApi.default,
    payload,
  )

  return result
}
export async function fetchTransactionsFiltersMerchantApi({
  id,
  payload,
}: {
  id:string
  payload: DefaultFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<TransactionResponse>> | undefined> {
  
  payload!.dates![0].setHours(0, 0, 0, 0)
  payload!.dates![1].setHours(23, 59, 59, 59)

  const formatPayload = {
    startDate: payload!.dates![0].toISOString(),
    endDate: payload!.dates![1].toISOString(),
    ...payload,
  }
  const result = await Http.get<SuccessResponse<PaginationResponse<TransactionResponse>>>(
    MerchantRouteApi.transactions(id),
    formatPayload,
  )

  return result
}

export async function fetchMerchantByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<MerchantResponse> | undefined> {
  return await Http.get<SuccessResponse<MerchantResponse>>(`${MerchantRouteApi.default}/${id}`)
}

export async function updateMerchantApi({
  id,
  data,
}: {
  id: string
  data: MerchantUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${MerchantRouteApi.default}/${id}`, data)
}
export async function toggleMerchantStatusApi({
  id,
  data,
}: {
  id: string
  data: MerchantStatusPayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${MerchantRouteApi.default}/${id}`, data)
}

export async function updateMerchantChargesApi({
  data,
}: {
  data: MerchantPayinPayoutChargePayload[]
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(MerchantRouteApi.updateCharges, data)
}

export async function createMerchantApi(
  data: MerchantRequest,
): Promise<SuccessResponse<MerchantResponse> | undefined> {
  const result = await Http.post<SuccessResponse<MerchantResponse>>(
    MerchantRouteApi.default,
    data,
    {
      // headers: {
      //   'Device-Id': getDeviceId(),
      // },
    },
  )

  return result
}

export async function deleteMerchantApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.delete<SuccessResponse<any>>(`${MerchantRouteApi.default}/${id}`)
}

export async function fetchMerchantStatsApi(payload?: MerchantStatsPayload): Promise<SuccessResponse<MerchantStatsResponse> | undefined> {

  payload!.dates![0].setHours(0, 0, 0, 0)
  payload!.dates![1].setHours(23, 59, 59, 59)

  const formatPayload = {
    startDate: payload!.dates![0].toISOString(),
    endDate: payload!.dates![1].toISOString(),
    merchant_id: payload!.merchant_id,
  }

  const result = await Http.get<SuccessResponse<MerchantStatsResponse>>(
    MerchantRouteApi.stats,
    formatPayload,
  )
  return result
}
 