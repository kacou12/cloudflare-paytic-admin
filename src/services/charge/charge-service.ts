import type { DefaultFiltersPayload } from '../global.type'
import {
  createChargeApi,
  deleteChargeApi,
  fetchChargeByIdApi,
  fetchFiltersChargesApi,
  updateChargeApi,
} from './charge-api'
import type { ChargeRequest, ChargeResponse, ChargeUpdatePayload } from './charge-type'

export async function fetchFiltersCharges(
  payload?: DefaultFiltersPayload,
): Promise<PaginationResponse<ChargeResponse> | undefined> {
  try {
    const res = await fetchFiltersChargesApi(payload)
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchChargeById(id: string): Promise<ChargeResponse | undefined> {
  try {
    const res = await fetchChargeByIdApi({ id })
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateCharge(
  id: string,
  data: ChargeUpdatePayload,
): Promise<any | undefined> {
  try {
    const res = await updateChargeApi({ id, data })
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function createCharge(data: ChargeRequest): Promise<ChargeResponse | undefined> {
  try {
    const res = await createChargeApi(data)
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function deleteCharge(id: string): Promise<any | undefined> {
  try {
    const res = await deleteChargeApi({ id })
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
