import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { ChargeRouteApi } from './charge-constants'
import type { ChargeRequest, ChargeResponse, ChargeUpdatePayload } from './charge-type'

export async function fetchFiltersChargesApi(
  payload?: DefaultFiltersPayload,
): Promise<SuccessResponse<PaginationResponse<ChargeResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<ChargeResponse>>>(
    ChargeRouteApi.default,
    payload,
  )
  return result
}

export async function fetchChargeByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<ChargeResponse> | undefined> {
  return await Http.get<SuccessResponse<ChargeResponse>>(`${ChargeRouteApi.default}/${id}`)
}

export async function updateChargeApi({
  id,
  data,
}: {
  id: string
  data: ChargeUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${ChargeRouteApi.default}/${id}`, data)
}

export async function createChargeApi(
  data: ChargeRequest,
): Promise<SuccessResponse<ChargeResponse> | undefined> {
  const result = await Http.post<SuccessResponse<ChargeResponse>>(ChargeRouteApi.default, data)
  return result
}

export async function deleteChargeApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.delete<SuccessResponse<any>>(`${ChargeRouteApi.default}/${id}`)
}
