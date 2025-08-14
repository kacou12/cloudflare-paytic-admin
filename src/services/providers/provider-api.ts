// import { env } from '@/config/env'
import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { ProviderRouteApi, ProviderServiceAvailibilityRouteApi } from './provider-constants'
import type { ProviderRequest, ProviderResponse, ProviderServiceAvailabilityPayload, ProviderUpdatePayload, ServiceAvailabilityResponse } from './provider-type'

export async function fetchFiltersProvidersApi({
  payload,
}: {
  payload: DefaultFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<ProviderResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<ProviderResponse>>>(
    ProviderRouteApi.default,
    payload,
  )

  return result
}

export async function fetchProviderByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<ProviderResponse> | undefined> {
  return await Http.get<SuccessResponse<ProviderResponse>>(`${ProviderRouteApi.default}/${id}`)
}

export async function updateProviderApi({
  id,
  data,
}: {
  id: string
  data: ProviderUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${ProviderRouteApi.default}/${id}`, data)
}

export async function createProviderApi(
  data: ProviderRequest,
): Promise<SuccessResponse<ProviderResponse> | undefined> {
  const result = await Http.post<SuccessResponse<ProviderResponse>>(
    ProviderRouteApi.default,
    data,
    {
      // headers: {
      //   'Device-Id': getDeviceId(),
      // },
    },
  )

  return result
}

export async function deleteProviderApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.delete<SuccessResponse<any>>(`${ProviderRouteApi.default}/${id}`)
}


export async function fetchProviderServiceAvailabilityApi(): Promise<
  SuccessResponse<PaginationResponse<ServiceAvailabilityResponse>> | undefined
> {
  return await Http.get<SuccessResponse<PaginationResponse<ServiceAvailabilityResponse>>>(
    `${ProviderServiceAvailibilityRouteApi.default}`,
    {
      limit: 100
    },
  )
}

export async function updateProviderServiceAvailabilityApi({
  data,
}: {
  data: ProviderServiceAvailabilityPayload[]
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(
    `${ProviderServiceAvailibilityRouteApi.default}`,
    data,
  )
}

