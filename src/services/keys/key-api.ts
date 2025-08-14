import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { KeyRouteApi } from './key-constants'
import type { KeyRequest, KeyResponse, KeyUpdatePayload } from './key-type'

export async function fetchFiltersKeysApi(
  payload?: DefaultFiltersPayload,
): Promise<SuccessResponse<PaginationResponse<KeyResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<KeyResponse>>>(
    KeyRouteApi.default,
    payload,
  )
  return result
}

export async function fetchKeyByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<KeyResponse> | undefined> {
  return await Http.get<SuccessResponse<KeyResponse>>(`${KeyRouteApi.default}/${id}`)
}

export async function updateKeyApi({
  id,
  data,
}: {
  id: string
  data: KeyUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${KeyRouteApi.default}/${id}`, data)
}

export async function createKeyApi(
  data: KeyRequest,
): Promise<SuccessResponse<KeyResponse> | undefined> {
  const result = await Http.post<SuccessResponse<KeyResponse>>(KeyRouteApi.default, data)
  return result
}

export async function deleteKeyApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.delete<SuccessResponse<any>>(`${KeyRouteApi.default}/${id}`)
}
