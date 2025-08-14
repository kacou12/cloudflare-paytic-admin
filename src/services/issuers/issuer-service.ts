import type { DefaultFiltersPayload } from '../global.type'
import {
  createIssuerApi,
  deleteIssuerApi,
  fetchFiltersIssuersApi,
  fetchIssuerByIdApi,
  updateIssuerApi,
} from './issuer-api'
import type { IssuerRequest, IssuerResponse, IssuerUpdatePayload } from './issuer-type'

export async function fetchFiltersIssuers(
  payload: DefaultFiltersPayload,
): Promise<PaginationResponse<IssuerResponse> | undefined> {
  try {
    let payloadData = { ...payload }
    const res = await fetchFiltersIssuersApi({
      payload,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchIssuerById({ id }: { id: string }): Promise<IssuerResponse | undefined> {
  try {
    const res = await fetchIssuerByIdApi({ id: id })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateIssuer({
  id,
  data,
}: {
  id: string
  data: IssuerUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateIssuerApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function createIssuer({ data }: { data: IssuerRequest }): Promise<any | undefined> {
  try {
    const res = await createIssuerApi(data)

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function deleteIssuer({ id }: { id: string }): Promise<any | undefined> {
  try {
    const res = await deleteIssuerApi({
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
