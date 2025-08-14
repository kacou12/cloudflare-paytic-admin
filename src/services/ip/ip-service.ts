import type { DefaultFiltersPayload } from '../global.type'
import { createIpApi, deleteIpApi, fetchIpByIdApi, fetchFiltersIpsApi, updateIpApi } from './ip-api'
import type { IpRequest, IpResponse, IpUpdatePayload } from './ip-type'

export async function fetchFiltersIps(
  payload: DefaultFiltersPayload,
): Promise<PaginationResponse<IpResponse> | undefined> {
  try {
    const res = await fetchFiltersIpsApi({ payload: payload })
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchIpById(x_id: string): Promise<IpResponse | undefined> {
  try {
    const res = await fetchIpByIdApi({ x_id })
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateIp(x_id: string, data: IpUpdatePayload): Promise<any | undefined> {
  try {
    const res = await updateIpApi({ x_id, data })
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function createIp(data: IpRequest): Promise<IpResponse | undefined> {
  try {
    const res = await createIpApi(data)
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function deleteIp(id: number): Promise<any | undefined> {
  try {
    const res = await deleteIpApi({ id })
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
