import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { IpRouteApi } from './ip-constants'
import type { IpRequest, IpResponse, IpUpdatePayload } from './ip-type'

export async function fetchFiltersIpsApi({
  payload,
}: {
  payload: DefaultFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<IpResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<IpResponse>>>(
    IpRouteApi.default,
    payload,
  )
  return result
}

export async function fetchIpByIdApi({
  x_id,
}: {
  x_id: string
}): Promise<SuccessResponse<IpResponse> | undefined> {
  return await Http.get<SuccessResponse<IpResponse>>(`${IpRouteApi.default}/${x_id}`)
}

export async function updateIpApi({
  x_id,
  data,
}: {
  x_id: string
  data: IpUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${IpRouteApi.default}/${x_id}`, data)
}

export async function createIpApi(
  data: IpRequest,
): Promise<SuccessResponse<IpResponse> | undefined> {
  const result = await Http.post<SuccessResponse<IpResponse>>(IpRouteApi.default, data)
  return result
}

export async function deleteIpApi({
  id,
}: {
  id: number
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.delete<SuccessResponse<any>>(`${IpRouteApi.default}`, { params: { pk: id } })
}
