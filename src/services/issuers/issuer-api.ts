import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { IssuerRouteApi } from './issuer-constants'
import type { IssuerRequest, IssuerResponse, IssuerUpdatePayload } from './issuer-type'

export async function fetchFiltersIssuersApi({
  payload,
}: {
  payload: DefaultFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<IssuerResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<IssuerResponse>>>(
    IssuerRouteApi.default,
    payload,
  )

  return result
}
export async function fetchIssuerByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<IssuerResponse> | undefined> {
  return await Http.get<SuccessResponse<IssuerResponse>>(`${IssuerRouteApi.default}/${id}`)
}

export async function updateIssuerApi({
  id,
  data,
}: {
  id: string
  data: IssuerUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${IssuerRouteApi.default}/${id}`, data)
}

export async function createIssuerApi(
  data: IssuerRequest,
): Promise<SuccessResponse<IssuerResponse> | undefined> {
  const result = await Http.post<SuccessResponse<IssuerResponse>>(IssuerRouteApi.default, data, {
    // headers: {
    //   'Device-Id': getDeviceId(),
    // },
  })

  return result
}

export async function deleteIssuerApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.delete<SuccessResponse<any>>(`${IssuerRouteApi.default}/${id}`)
}
