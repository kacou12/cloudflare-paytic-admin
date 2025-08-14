import type { DefaultFiltersPayload } from '../global.type'
import {
  createProviderApi,
  deleteProviderApi,
  fetchFiltersProvidersApi,
  fetchProviderByIdApi,

   fetchProviderServiceAvailabilityApi,
  updateProviderApi,
  updateProviderServiceAvailabilityApi,
} from './provider-api'
import type { ProviderRequest, ProviderResponse, ProviderServiceAvailabilityPayload, ProviderUpdatePayload, ServiceAvailabilityResponse } from './provider-type'

export async function fetchFiltersProviders(
  payload: DefaultFiltersPayload,
): Promise<PaginationResponse<ProviderResponse> | undefined> {
  try {
    let payloadData = { ...payload }
    const res = await fetchFiltersProvidersApi({
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

export async function fetchProviderById({
  id,
}: {
  id: string
}): Promise<ProviderResponse | undefined> {
  try {
    const res = await fetchProviderByIdApi({ id: id })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateProvider({
  id,
  data,
}: {
  id: string
  data: ProviderUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateProviderApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function createProvider({
  data,
}: {
  data: ProviderRequest
}): Promise<any | undefined> {
  try {
    const res = await createProviderApi(data)

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function deleteProvider({ id }: { id: string }): Promise<any | undefined> {
  try {
    const res = await deleteProviderApi({
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}


export async function updateProviderServiceAvailability({
  data,
}: {
  data: ProviderServiceAvailabilityPayload[]
}): Promise<any | undefined> {
  try {
    const res = await updateProviderServiceAvailabilityApi({
      data,
    })

    return res
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function   fetchProviderServiceAvailibilities(): Promise<
  PaginationResponse<ServiceAvailabilityResponse> | undefined
> {
  try {
    const res = await fetchProviderServiceAvailabilityApi()
    let resultData = res?.data;
    

    resultData!.items = [...resultData!.items].sort((a, b) => a.provider!.operator.toLowerCase().localeCompare(b.provider!.operator.toLowerCase()))
    

    return resultData;
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
