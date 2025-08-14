import type { DefaultFiltersPayload } from '../global.type'
import type { TransactionResponse } from '../transactions/transaction-type'
import {
  createMerchantApi,
  deleteMerchantApi,
  fetchFiltersMerchantsApi,
  fetchMerchantByIdApi,
  fetchMerchantStatsApi, // Added fetchMerchantStatsApi
  fetchTransactionsFiltersMerchantApi,
  toggleMerchantStatusApi,
  updateMerchantApi,
  updateMerchantChargesApi,
} from './merchant-api'
import type { MerchantPayinPayoutChargePayload, MerchantRequest, MerchantResponse, MerchantStatsPayload, MerchantStatsResponse, MerchantStatusPayload, MerchantUpdatePayload } from './merchant-type' // Added MerchantStatsPayload, MerchantStatsResponse

export async function fetchFiltersMerchants(
  payload: DefaultFiltersPayload,
): Promise<PaginationResponse<MerchantResponse> | undefined> {
  try {
    let payloadData = { ...payload }
    const res = await fetchFiltersMerchantsApi({
      payload,
    })

    let customData = res?.data;

    customData?.items.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime(); // dateB - dateA pour le plus récent au plus ancien
    });


    return customData;
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function fetchTransactionsFiltersMerchant(
  id:string,
  payload: DefaultFiltersPayload,
): Promise<PaginationResponse<TransactionResponse> | undefined> {
  try {
    let payloadData = { ...payload }
    const res = await fetchTransactionsFiltersMerchantApi({
      id,
      payload,
    })

    let customData = res?.data;

    customData?.items.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime(); // dateB - dateA pour le plus récent au plus ancien
    });


    return customData;
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchMerchantById({
  id,
}: {
  id: string
}): Promise<MerchantResponse | undefined> {
  try {
    const res = await fetchMerchantByIdApi({ id: id })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function toggleMerchantStatus({
  id,
  data,
}: {
  id: string
  data: MerchantStatusPayload
}): Promise<any | undefined> {
  try {
    const res = await toggleMerchantStatusApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function updateMerchant({
  id,
  data,
}: {
  id: string
  data: MerchantUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateMerchantApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateMerchantCharges({

  data,
}: {

  data: MerchantPayinPayoutChargePayload[]
}): Promise<any | undefined> {
  try {
    const res = await updateMerchantChargesApi({
      data: data,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchMerchantStats(payload?: MerchantStatsPayload): Promise<MerchantStatsResponse | undefined> {
  try {
    const res = await fetchMerchantStatsApi(payload)
    return res?.data
  }
  catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function createMerchant({
  data,
}: {
  data: MerchantRequest
}): Promise<any | undefined> {
  try {
    const res = await createMerchantApi(data)

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function deleteMerchant({ id }: { id: string }): Promise<any | undefined> {
  try {
    const res = await deleteMerchantApi({
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
