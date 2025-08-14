import type { DefaultFiltersPayload } from '../global.type'
import {
  createKeyApi,
  deleteKeyApi,
  fetchKeyByIdApi,
  fetchFiltersKeysApi,
  updateKeyApi,
} from './key-api'
import type { KeyRequest, KeyResponse, KeyUpdatePayload } from './key-type'

export async function fetchFiltersKeys(
  payload?: DefaultFiltersPayload,
): Promise<PaginationResponse<KeyResponse> | undefined> {
  try {
    const res = await fetchFiltersKeysApi(payload)
    
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchKeyById(id: string): Promise<KeyResponse | undefined> {
  try {
    const res = await fetchKeyByIdApi({ id })
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateKey(id: string, data: KeyUpdatePayload): Promise<any | undefined> {
  try {
    const res = await updateKeyApi({ id, data })
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function createKey(data: KeyRequest): Promise<KeyResponse | undefined> {
  try {
    const res = await createKeyApi(data)
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function deleteKey(id: string): Promise<any | undefined> {
  try {
    const res = await deleteKeyApi({ id })
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
