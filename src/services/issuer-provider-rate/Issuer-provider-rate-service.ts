import type { DefaultFiltersPayload } from '../global.type'
import {
  createIssuerProviderRateApi,
  fetchIssuerProviderRateApi,
  updateIssuerProviderRateApi,
} from './Issuer-provider-rate-api'
import type {
  IssuerProviderRateRequest,
  IssuerProviderRateResponse,
  IssuerProviderRateUpdatePayload,
  UpdateIssuerProviderRateUpdatePayload,
} from './Issuer-provider-rate-type'

export async function fetchIssuerProviderRate(payload: DefaultFiltersPayload): Promise<PaginationResponse<IssuerProviderRateResponse> | undefined> {
  try {
    const res = await fetchIssuerProviderRateApi(payload)
    return res?.data

    
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateIssuerProviderRate({

  data,
}: {
  
  data: UpdateIssuerProviderRateUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateIssuerProviderRateApi({
      
      data: data,
    })
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function createIssuerProviderRate({
  data,
}: {
  data: IssuerProviderRateRequest
}): Promise<any | undefined> {
  try {
    const res = await createIssuerProviderRateApi([data])

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
