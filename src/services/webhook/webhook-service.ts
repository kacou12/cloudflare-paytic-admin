import type { WebhookFiltersPayload } from '../global.type'
import {
  createWebhookApi,
  deleteWebhookApi,
  fetchFiltersWebhookApi,
  fetchWebhookByIdApi,
  updateWebhookApi,
} from './webhook-api'
import type { WebhookPayload, WebhookRequest, WebhookResponse } from './webhook-type'

export async function fetchFiltersWebhook(
  payload: WebhookFiltersPayload,
): Promise<PaginationResponse<WebhookResponse> | undefined> {
  try {
    let payloadData = { ...payload }
    const res = await fetchFiltersWebhookApi({
      payload,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function createWebhook(data: WebhookRequest) {
  try {
    const res = await createWebhookApi(data)
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchWebhookById(id: string) {
  try {
    const res = await fetchWebhookByIdApi(id)
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateWebhook(id: string, data: WebhookPayload) {
  try {
    const res = await updateWebhookApi(id, data)
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function deleteWebhook(id: string) {
  try {
    const res = await deleteWebhookApi(id)
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
