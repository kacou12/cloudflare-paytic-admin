import type { DefaultFiltersPayload, WebhookFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { WebhookRouteApi } from './webhook-constants'
import type { WebhookPayload, WebhookRequest, WebhookResponse } from './webhook-type'

export async function fetchFiltersWebhookApi({
  payload,
}: {
  payload: WebhookFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<WebhookResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<WebhookResponse>>>(
    WebhookRouteApi.default,
    payload,
  )

  return result
}

export async function createWebhookApi(data: WebhookRequest) {
  return await Http.post(WebhookRouteApi.default, data)
}

export async function fetchWebhookByIdApi(id: string) {
  return await Http.get(WebhookRouteApi.getOne(id))
}

export async function updateWebhookApi(id: string, data: WebhookPayload) {
  return await Http.put(WebhookRouteApi.getOne(id), data)
}

export async function deleteWebhookApi(id: string) {
  return await Http.delete(WebhookRouteApi.getOne(id))
}
