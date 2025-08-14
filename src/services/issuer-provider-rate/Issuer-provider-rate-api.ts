import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { IssuerProviderRateRouteApi } from './Issuer-provider-rate-constants'
import type {
  IssuerProviderRateRequest,
  IssuerProviderRateResponse,
  IssuerProviderRateUpdatePayload,
  UpdateIssuerProviderRateUpdatePayload,
} from './Issuer-provider-rate-type'

export async function fetchIssuerProviderRateApi(payload: DefaultFiltersPayload): Promise<
  SuccessResponse<PaginationResponse<IssuerProviderRateResponse>> | undefined
> {
  const result = await Http.get<SuccessResponse<PaginationResponse<IssuerProviderRateResponse>>>(
    IssuerProviderRateRouteApi.default,
    payload
  )
  return result
}

export async function updateIssuerProviderRateApi({

  data,
}: {
 
  data: UpdateIssuerProviderRateUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${IssuerProviderRateRouteApi.default}/${data.id}`, {
    cashinRate: data.cashin_rate,
    cashoutRate: data.cashout_rate
  })
}

export async function createIssuerProviderRateApi(
  data: IssuerProviderRateRequest[],
): Promise<SuccessResponse<IssuerProviderRateResponse> | undefined> {
  const result = await Http.post<SuccessResponse<IssuerProviderRateResponse>>(
    IssuerProviderRateRouteApi.default,
    data,
    {
      // headers: {
      //   'Device-Id': getDeviceId(),
      // },
    },
  )

  return result
}
