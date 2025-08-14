import type { DefaultFiltersPayload } from '../global.type'
import {
  fetchMerchantRequestsApi,
  rejectMerchantRequestApi,
  validateMerchantRequestApi,
} from './merchant-request-api'
import type { RejectMerchantRequest } from './merchant-request-schema'
import type { MerchantRequestResponse } from './merchant-request.type'

export async function fetchMerchantRequests(
  payload: DefaultFiltersPayload,
): Promise<PaginationResponse<MerchantRequestResponse> | undefined> {
  try {
    const res = await fetchMerchantRequestsApi({
      payload,
    })

    const customData = res?.data

    customData?.items.sort((a, b) => {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)
      return dateB.getTime() - dateA.getTime()
    })

    return customData
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function validateMerchantRequest({ id }: { id: string }): Promise<any | undefined> {
  try {
    const res = await validateMerchantRequestApi({
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function rejectMerchantRequest({
  id,
  data,
}: {
  id: string
  data: RejectMerchantRequest
}): Promise<any | undefined> {
  try {
    const res = await rejectMerchantRequestApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
